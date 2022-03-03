import { useSelector } from 'react-redux';
import { AuthSelectors } from 'redux/AuthRedux';
// import { decode } from 'jsonwebtoken';
import LOGGER from 'services/Logger';
import { useDispatch } from 'react-redux';
import AuthActions from 'redux/AuthRedux';

function decode(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const useAuthentication = () => {
  const dispatch = useDispatch();
  const user = useSelector(AuthSelectors.getUser);
  const token = localStorage.getItem('token');
  try {
    const decodedToken = token && decode(token);
    if (!token || decodedToken.exp < (new Date().getTime() + 1) / 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      dispatch(AuthActions.logout());
      throw new Error('Expired/invalid token');
    }
  } catch (err) {
    LOGGER.log(err);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(AuthActions.logout());
  }
  return { isAuthenticated: !!user };
};

export default useAuthentication;
