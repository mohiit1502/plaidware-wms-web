import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import UsersActions, { UsersTypes } from '../redux/UsersRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestUsersData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      UsersActions.getUsersSuccess({
        loader: payload?.loader,
        usersDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedUsersData(response.data.error);
    yield put(
      UsersActions.getUsersFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onCreateUserData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    const data = response.data?.data;
    const msg = payload.toastMessage.replace('__placeholder__', data && data.fullName ? '"' + data.fullName + '" ' : '');
    toast(msg);
    payload.onSuccessfulSubmission(data);
    yield put(
      UsersActions.createUserSuccess({
        loader: payload?.loader,
        usersDetail: response?.data?.data
      })
    );
  } else {
    toast('Something went wrong!');
    payload.onValidationFailed(response.data?.error);
    yield put(
      UsersActions.createUserFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [
  takeLatest(UsersTypes.GET_USERS_ACTION, onRequestUsersData),
  takeLatest(UsersTypes.CREATE_USER_ACTION, onCreateUserData)
];
