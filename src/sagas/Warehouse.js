import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import WarehouseActions, { WarehouseTypes } from '../redux/WarehouseRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestWarehouseData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      WarehouseActions.warehouseDataSuccess({
        loader: payload?.loader,
        warehouseDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedWarehouseData(response.data.error);
    yield put(
      WarehouseActions.warehouseDataFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [takeLatest(WarehouseTypes.WAREHOUSE_DATA_ACTION, onRequestWarehouseData)];
