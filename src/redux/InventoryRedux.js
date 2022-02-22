import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  addInventoryAction: ['payload'],
  addInventorySuccess: ['data'],
  addInventoryFailure: ['error']
});

export const InventoryTypes = Types;
const InventoryActions = Creators;
export default InventoryActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  addInventoryDetail: [],
  addInventoryLoading: false,
  addInventoryerror: {}
});

/* ------------- Selectors ------------- */
export const InventorySelectors = {
  addInventoryDetail: (state) => state.inventory.inventoryDetail
};

/* ------------- Reducers ------------- */
export const onAddInventoryAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onAddInventorySuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    addInventoryDetail: data.addInventoryDetail
  });

export const onAddInventoryFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const inventoryReducer = createReducer(INITIAL_STATE, {
  [Types.ADD_INVENTORY_ACTION]: onAddInventoryAction,
  [Types.ADD_INVENTORY_SUCCESS]: onAddInventorySuccess,
  [Types.ADD_INVENTORY_FAILURE]: onAddInventoryFailure
});
