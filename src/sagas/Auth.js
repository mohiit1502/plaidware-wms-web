import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import ApiServices from 'services/API/ApiServices';
import AuthActions, { AuthTypes } from '../redux/AuthRedux';
// import {
//   getError,
// } from '../services/Utils';

export function* onRequestLogin({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    localStorage.setItem('token', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    yield put(
      AuthActions.loginSuccess({
        loader: payload?.loader,
        user: response?.data?.data
      })
    );
  } else {
    payload.onFailedLogin(response.data.error);
    yield put(
      AuthActions.loginFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [takeLatest(AuthTypes.LOGIN_REQUEST, onRequestLogin)];
