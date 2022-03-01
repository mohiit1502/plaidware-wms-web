import { AuthorizedAPI } from 'config';
import { call, put, takeEvery } from 'redux-saga/effects';
import ApiServices from 'services/API/ApiServices';
import ItemActions, { ItemTypes } from '../redux/ItemRedux';

export function* onRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    `${payload?.slug}${payload?.inventoryId}&page=${payload?.page}&perPage=${payload?.perPage}`,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      ItemActions.itemSuccess({
        loader: payload?.loader,
        items: response?.data?.data,
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

export function* onEditRequestItem({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      ItemActions.editItemSuccess({
        loader: payload?.loader,
        item: response?.data?.data,
        type: payload?.type
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

export default [
  takeEvery(ItemTypes.ITEM_REQUEST, onRequestItem),
  takeEvery(ItemTypes.EDIT_ITEM_REQUEST, onEditRequestItem)
];
