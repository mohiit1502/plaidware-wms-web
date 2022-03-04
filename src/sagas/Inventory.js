import { AuthorizedAPI } from 'config';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import InventoryActions from 'redux/InventoryRedux';
import { InventoryTypes } from 'redux/InventoryRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestGetInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      InventoryActions.getInventorySuccess({
        loader: payload?.loader,
        getInventoryDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedGetInventoryData(response.data.error);
    yield put(
      InventoryActions.getInventoryFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestGetInventoryTypesData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      InventoryActions.getInventoryTypesSuccess({
        loader: payload?.loader,
        inventoryTypes: response?.data?.data
      })
    );
  } else {
    payload.onFailedGetInventoryData(response.data.error);
    yield put(
      InventoryActions.getInventoryTypesFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestAddInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    toast.success('New inventory added', {
      theme: 'colored'
    });
    yield put(
      InventoryActions.addInventorySuccess({
        loader: payload?.loader,
        newInventory: response?.data?.data?.inventoryData
      })
    );
    payload.navigateTo();
  } else {
    toast.error('Failed to add inventory', {
      theme: 'colored'
    });
    payload.onFailedAddInventoryData(response.data.error);
    yield put(
      InventoryActions.addInventoryFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestUpdateInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    toast.success('Updated inventory successfully', {
      theme: 'colored'
    });
    yield put(
      InventoryActions.updateInventorySuccess({
        loader: payload?.loader,
        updateInventory: response?.data?.data
      })
    );
    // payload.navigateTo();
  } else {
    toast.error('Failed to update inventory', {
      theme: 'colored'
    });
    yield put(
      InventoryActions.updateInventoryFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestDeleteInventoryData({ payload }) {
  const response = yield call(ApiServices[payload?.method], AuthorizedAPI, payload?.slug);
  if (response?.status === 200) {
    toast.success('Deleted inventory successfully', {
      theme: 'colored'
    });
    payload.navigateTo();
    yield put(
      InventoryActions.deleteInventorySuccess({
        loader: payload?.loader,
        deletedInventoryID: payload?.inventoryId
      })
    );
  } else {
    toast.error('Failed to delete inventory', {
      theme: 'colored'
    });
    yield put(
      InventoryActions.updateInventoryFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [
  takeEvery(InventoryTypes.GET_INVENTORY_ACTION, onRequestGetInventoryData),
  takeEvery(InventoryTypes.ADD_INVENTORY_ACTION, onRequestAddInventoryData),
  takeEvery(InventoryTypes.DELETE_INVENTORY_ACTION, onRequestDeleteInventoryData),
  takeEvery(InventoryTypes.UPDATE_INVENTORY_ACTION, onRequestUpdateInventoryData),
  takeEvery(InventoryTypes.GET_INVENTORY_TYPES_ACTION, onRequestGetInventoryTypesData)
];
