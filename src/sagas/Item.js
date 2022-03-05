import { AuthorizedAPI } from 'config';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import ApiServices from 'services/API/ApiServices';
import ItemActions, { ItemTypes } from '../redux/ItemRedux';

export function* onRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    `${payload?.slug}${payload?.inventoryId}&page=${payload?.page}&perPage=${payload?.perPage}${
      payload?.family ? '&family=' + payload?.family : ''
    }`,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      ItemActions.itemSuccess({
        loader: payload?.loader,
        items: response?.data?.data.result,
        count: response?.data?.data.count,
        page: payload?.page,
        reset: !payload.page
      })
    );
  } else {
    yield put(
      ItemActions.itemFailure({
        loader: payload?.loader,
        error: response?.message
      })
    );
  }
}

export function* onRequestOneItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    `${payload.slug}${payload?.itemId}`
  );
  if (response?.status === 200) {
    yield put(
      ItemActions.oneItemSuccess({
        loader: payload?.loader,
        item: response?.data?.data
      })
    );
    // payload.navigateTo(
    //   `/setup/inventory/browse/${payload?.widgetName}/${payload?.inventoryId}/edit/${payload?.itemId}`
    // );
  } else {
    toast.error('Failed to get item details', {
      theme: 'colored'
    });
    yield put(
      ItemActions.itemFailure({
        loader: payload?.loader,
        error: response?.message
      })
    );
  }
}

function addImagesToFormData(formData, images) {
  let imgIdx = 0;
  let preImgIdx = 0;
  images.forEach((image) => {
    if (image.file) formData.append(`images[${imgIdx++}]`, image.file);
    else formData.append(`imageIds[${preImgIdx++}]`, image._id);
  });
}

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      if (key !== 'images')
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      else addImagesToFormData(formData, data['images']);
    });
  } else {
    // eslint-disable-next-line eqeqeq
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

const createFormData = (data) => {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
};

export function* onAddRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    createFormData(payload?.data)
  );
  if (response?.status === 200) {
    toast.success(`Added item: ${payload.data.commonName}`, {
      theme: 'colored'
    });
    // payload.navigateTo(
    //   `/setup/inventory/browse/${payload?.widgetName}/${payload?.inventoryId}/edit/${response?.data?.data?._id}`
    // );
    payload.navigateTo('/setup/inventory');
    yield put(
      ItemActions.addItemSuccess({
        loader: payload?.loader,
        item: response?.data?.data
      })
    );
  } else {
    toast.error('Failed to add item', {
      theme: 'colored'
    });
    yield put(
      ItemActions.itemFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onEditRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    createFormData(payload?.data)
  );
  if (response?.status === 200) {
    toast.success(`Successfully edited item: ${payload.data.commonName}`, {
      theme: 'colored'
    });
    payload.navigateTo('/setup/inventory');
    yield put(
      ItemActions.addItemSuccess({
        loader: payload?.loader,
        item: response?.data?.data
      })
    );
  } else {
    toast.error('Failed to edit item', {
      theme: 'colored'
    });
    yield put(
      ItemActions.itemFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onDeleteRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug + payload?.itemId
  );
  if (response?.status === 200) {
    toast.success('Successfully deleted item', {
      theme: 'colored'
    });
    payload.refreshDispatch();
    yield put(
      ItemActions.deleteItemSuccess({
        loader: payload?.loader,
        item: response?.data?.data
      })
    );
  } else {
    toast.error('Failed to delete item', {
      theme: 'colored'
    });
    yield put(
      ItemActions.itemFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [
  takeEvery(ItemTypes.ITEM_REQUEST, onRequestItem),
  takeEvery(ItemTypes.ONE_ITEM_REQUEST, onRequestOneItem),
  takeEvery(ItemTypes.ADD_ITEM_REQUEST, onAddRequestItem),
  takeEvery(ItemTypes.EDIT_ITEM_REQUEST, onEditRequestItem),
  takeEvery(ItemTypes.DELETE_ITEM_REQUEST, onDeleteRequestItem)
];
