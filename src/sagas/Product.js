import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import ProductActions from 'redux/ProductsRedux';
import { ProductTypes } from 'redux/ProductsRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestAddProductData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      ProductActions.addProductSuccess({
        loader: payload?.loader,
        addProductDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedAddProductData(response.data.error);
    yield put(
      ProductActions.addProductFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onRequestGetProductById({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      ProductActions.getProductByIdSuccess({
        loader: payload?.loader,
        getProductByIdDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedGetProductById(response.data.error);
    yield put(
      ProductActions.getProductByIdFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [
  takeLatest(ProductTypes.ADD_PRODUCT_ACTION, onRequestAddProductData),
  takeLatest(ProductTypes.GET_PRODUCT_BY_ID_ACTION, onRequestGetProductById)
];
