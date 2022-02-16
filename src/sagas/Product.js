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
export default [takeLatest(ProductTypes.ADD_PRODUCT_ACTION, onRequestAddProductData)];
