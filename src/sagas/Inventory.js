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

const parseDataToFormData = (data) => {
  var formData = new FormData();
  formData.append('name', data.name);
  formData.append('widgetName', data.widgetName);
  formData.append('icon_slug', 'testslug');
  formData.append('policies[orderTracking]', data.policies.orderTracking);
  formData.append('policies[alerting]', data.policies.alerting);
  formData.append('policies[replenishment]', data.policies.replenishment);
  formData.append('policies[preferredLocations]', data.policies.preferredLocations);
  formData.append('policies[inventory_process]', data.policies.inventory_process);
  data.image && formData.append('image', data.image);
  return formData;
};

export function* onRequestAddInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    parseDataToFormData(payload?.data)
  );
  if (response?.status === 200) {
    yield put(
      InventoryActions.addInventorySuccess({
        loader: payload?.loader,
        newInventory: response?.data?.data?.inventoryData
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

export function* onRequestUpdateInventoryData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    toast('Updated inventory successfully');
    yield put(
      InventoryActions.updateInventorySuccess({
        loader: payload?.loader,
        updateInventory: response?.data?.data
      })
    );
  } else {
    payload.onFailedUpdateInventoryData(response.data.error);
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
  takeEvery(InventoryTypes.UPDATE_INVENTORY_ACTION, onRequestUpdateInventoryData),
  takeEvery(InventoryTypes.GET_INVENTORY_TYPES_ACTION, onRequestGetInventoryTypesData)
];
