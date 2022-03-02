import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import WarehouseActions, { WarehouseTypes } from '../redux/WarehouseRedux';
import ApiServices from 'services/API/ApiServices';
import { toast } from 'react-toastify';

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

const makeFormData = (data) => {
  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.address) formData.append('address', data.address);
  if (data.specs) formData.append('specs', data.specs);
  if (data.company_id) formData.append('company_id', data.company_id);
  if (data.image[0].file) formData.append('image', data.image[0].file);
  return formData;
};

export function* onRequestCreateWarehouse({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    makeFormData(payload?.data)
  );
  if (response?.status === 200 && response?.data?.message) {
    toast('Warehouse created successfully');
    yield put(
      WarehouseActions.createWarehouseSuccess({
        loader: payload?.loader,
        createdWarehouse: response?.data?.message
      })
    );
    payload.navigateTo(response?.data?.message?._id);
  } else {
    toast('Failed to create warehouse');
    yield put(
      WarehouseActions.createWarehouseFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestEditWarehouse({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    makeFormData(payload?.data)
  );
  if (response?.status === 200) {
    toast('Warehouse edited successfully');
    yield put(
      WarehouseActions.editWarehouseSuccess({
        loader: payload?.loader,
        editedWarehouse: response?.data?.data
      })
    );
  } else {
    toast('Failed to edit warehouse');
    yield put(
      WarehouseActions.editWarehouseFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [
  takeLatest(WarehouseTypes.WAREHOUSE_DATA_ACTION, onRequestWarehouseData),
  takeLatest(WarehouseTypes.CREATE_WAREHOUSE_ACTION, onRequestCreateWarehouse),
  takeLatest(WarehouseTypes.EDIT_WAREHOUSE_ACTION, onRequestEditWarehouse)
];
