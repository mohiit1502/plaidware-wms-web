import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import InventoryActions from 'redux/InventoryRedux';
import { InventoryTypes } from 'redux/InventoryRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestAddInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      InventoryActions.addInventorySuccess({
        loader: payload?.loader,
        addInventoryDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedAddInventoryData(response.data.error);
    yield put(
      InventoryActions.addInventoryFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [takeLatest(InventoryTypes.ADD_INVENTORY_ACTION, onRequestAddInventoryData)];
