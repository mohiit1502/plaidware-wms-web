import { useSelector } from 'react-redux';
import { AuthSelectors } from 'redux/AuthRedux';
import { decode } from 'jsonwebtoken';
import LOGGER from 'services/Logger';
import { useDispatch } from 'react-redux';
import AuthActions from 'redux/AuthRedux';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const user = useSelector(AuthSelectors.getUser);
  const token = localStorage.getItem('token');
  try {
    const { exp } = decode(token);
    if (exp < (new Date().getTime() + 1) / 1000) {
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
    return { isAuthenticated: false };
  }
  return { isAuthenticated: !!user };
};

export default useAuthentication;
