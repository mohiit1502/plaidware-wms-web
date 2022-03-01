import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  warehouseDataAction: ['payload'],
  warehouseDataSuccess: ['data'],
  warehouseDataFailure: ['error'],

  createWarehouseAction: ['payload'],
  createWarehouseSuccess: ['data'],
  createWarehouseFailure: ['error'],

  editWarehouseAction: ['payload'],
  editWarehouseSuccess: ['data'],
  editWarehouseFailure: ['error']
});

export const WarehouseTypes = Types;
const WarehouseActions = Creators;
export default WarehouseActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  warehouseDetail: [],
  error: {},

  createWarehouse: [],
  createWarehouseLoading: false,
  createWarehouseError: {},

  editWarehouse: [],
  editWarehouseLoading: false,
  editWarehouseError: {}
});

/* ------------- Selectors ------------- */
export const WarehouseSelectors = {
  getWarehouseDetail: (state) => state.warehouse.warehouseDetail,
  getWarehouseDetailById: (id) => (state) =>
    state.warehouse.warehouseDetail.find((x) => x._id === id),
  createWarehouseDetail: (state) => state.warehouse.createWarehouse,
  editWarehouseDetail: (state) => state.warehouse.editWarehouse
};

/* ------------- Reducers ------------- */
export const onWarehouseDataAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onWarehouseDataSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    warehouseDetail: data.warehouseDetail
  });

export const onWarehouseDataFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onCreateWarehouseAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onCreateWarehouseSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    createWarehouse: data.createWarehouse
  });

export const onCreateWarehouseFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onEditWarehouseAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onEditWarehouseSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    editWarehouse: data.editWarehouse
  });

export const onEditWarehouseFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });
/* ------------- Hookup Reducers To Types ------------- */
export const warehouseReducer = createReducer(INITIAL_STATE, {
  [Types.WAREHOUSE_DATA_ACTION]: onWarehouseDataAction,
  [Types.WAREHOUSE_DATA_SUCCESS]: onWarehouseDataSuccess,
  [Types.WAREHOUSE_DATA_FAILURE]: onWarehouseDataFailure,

  [Types.CREATE_WAREHOUSE_ACTION]: onCreateWarehouseAction,
  [Types.CREATE_WAREHOUSE_SUCCESS]: onCreateWarehouseSuccess,
  [Types.CREATE_WAREHOUSE_FAILURE]: onCreateWarehouseFailure,

  [Types.EDIT_WAREHOUSE_ACTION]: onEditWarehouseAction,
  [Types.EDIT_WAREHOUSE_SUCCESS]: onEditWarehouseSuccess,
  [Types.EDIT_WAREHOUSE_FAILURE]: onEditWarehouseFailure
});
