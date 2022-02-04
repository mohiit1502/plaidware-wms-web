import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  warehouseDataAction: ['payload'],
  warehouseDataSuccess: ['data'],
  warehouseDataFailure: ['error']
});

export const WarehouseTypes = Types;
const WarehouseActions = Creators;
export default WarehouseActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  warehouseDetail: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const WarehouseSelectors = {
  getWarehouseDetail: (state) => state.warehouse.warehouseDetail
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

/* ------------- Hookup Reducers To Types ------------- */
export const warehouseReducer = createReducer(INITIAL_STATE, {
  [Types.WAREHOUSE_DATA_ACTION]: onWarehouseDataAction,
  [Types.WAREHOUSE_DATA_SUCCESS]: onWarehouseDataSuccess,
  [Types.WAREHOUSE_DATA_FAILURE]: onWarehouseDataFailure
});
