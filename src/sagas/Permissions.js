import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import PermissionsActions, { PermissionsTypes } from '../redux/PermissionsRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestPermissionsData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      PermissionsActions.getPermissionsSuccess({
        loader: payload?.loader,
        permissionsDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedPermissionsData(response.data.error);
    yield put(
      PermissionsActions.getPermissionsFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestActionsData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      PermissionsActions.getActionsSuccess({
        loader: payload?.loader,
        actionsDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedActionsData(response.data.error);
    yield put(
      PermissionsActions.getActionsFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [
  takeLatest(PermissionsTypes.GET_PERMISSIONS_ACTION, onRequestPermissionsData),
  takeLatest(PermissionsTypes.GET_ACTIONS_ACTION, onRequestActionsData)
];
