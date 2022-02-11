import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import RolesActions, { RolesTypes } from '../redux/RolesRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestRolesData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      RolesActions.getRolesSuccess({
        loader: payload?.loader,
        rolesDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedRolesData(response.data.error);
    yield put(
      RolesActions.getRolesFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [takeLatest(RolesTypes.GET_ROLES_ACTION, onRequestRolesData)];
