import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getProductByIdAction: ['payload'],
  getProductByIdSuccess: ['data'],
  getProductByIdFailure: ['error'],
  addProductAction: ['payload'],
  addProductSuccess: ['data'],
  addProductFailure: ['error']
});

export const ProductTypes = Types;
const ProductActions = Creators;
export default ProductActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  addProductDetail: [],
  addProductLoading: false,
  addProducterror: {},
  getProductByIdDetail: []
});

/* ------------- Selectors ------------- */
export const ProductSelectors = {
  addProductDetail: (state) => state.product.productDetail,
  getProductDetail: (state) => state.product.getProductByIdDetail
};

/* ------------- Reducers ------------- */
export const onGetProductByIdAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetProductByIdSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    getProductByIdDetail: data.getProductByIdDetail
  });

export const onGetProductByIdFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });
export const onAddProductAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onAddProductSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    addProductDetail: data.addProductDetail
  });

export const onAddProductFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const productReducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCT_BY_ID_ACTION]: onGetProductByIdAction,
  [Types.GET_PRODUCT_BY_ID_SUCCESS]: onGetProductByIdSuccess,
  [Types.GET_PRODUCT_BY_ID_FAILURE]: onGetProductByIdFailure,
  [Types.ADD_PRODUCT_FAILURE]: onAddProductFailure,
  [Types.ADD_PRODUCT_ACTION]: onAddProductAction,
  [Types.ADD_PRODUCT_SUCCESS]: onAddProductSuccess,
  [Types.ADD_PRODUCT_FAILURE]: onAddProductFailure
});
