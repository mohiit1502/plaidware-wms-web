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
  payload?.callback && payload?.callback(false);
  if (response?.status === 200) {
    yield put(
      UsersActions.getUsersSuccess({
        loader: payload?.loader,
        usersDetail: response?.data?.data
      })
    );
  } else {
    toast('Failed to fetch user list');
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
    payload?.data,
    {
      processData: false,
      contentType: false
    }
  );
  payload?.callback && payload?.callback(false);
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
    const error = response?.originalError?.response?.data?.error;
    toast(error && error.indexOf('E11000') > -1 ? 'Email already exists!' : 'Something went wrong!');
    payload.onValidationFailed();
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
