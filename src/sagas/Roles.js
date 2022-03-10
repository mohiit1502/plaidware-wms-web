import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import RolesActions, { RolesTypes } from '../redux/RolesRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestRolesData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  payload?.callback && payload?.callback();
  if (response?.status === 200) {
    yield put(
      RolesActions.getRolesSuccess({
        loader: payload?.loader,
        rolesDetail: response?.data?.data
      })
    );
  } else {
    toast('Failed to fetch roles');
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
