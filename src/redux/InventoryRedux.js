import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getInventoryAction: ['payload'],
  getInventorySuccess: ['data'],
  getInventoryFailure: ['error'],
  addInventoryAction: ['payload'],
  addInventorySuccess: ['data'],
  addInventoryFailure: ['error'],
  updateInventoryAction: ['payload'],
  updateInventorySuccess: ['data'],
  updateInventoryFailure: ['error'],
  getInventoryTypesAction: ['payload'],
  getInventoryTypesSuccess: ['data'],
  getInventoryTypesFailure: ['error']
});

export const InventoryTypes = Types;
const InventoryActions = Creators;
export default InventoryActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  getInventoryDetail: [],
  addInventoryDetail: [],
  updateInventoryDetail: [],
  addInventoryLoading: false,
  addInventoryerror: {},
  inventoryTypes: []
});

/* ------------- Selectors ------------- */
export const InventorySelectors = {
  addInventoryDetail: (state) => state.inventory.inventoryDetail,
  getInventoryDetail: (state) => state.inventory.getInventoryDetail,
  getInventoryDetailById: (id) => (state) =>
    state.inventory.getInventoryDetail.find((x) => x._id === id),
  getInventoryTypes: (state) => state.inventory.inventoryTypes,
  updateInventoryDetail: (state) => state.inventory.updateInventoryDetail
};

/* ------------- Reducers ------------- */
export const onGetInventoryAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetInventorySuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    getInventoryDetail: data.getInventoryDetail
  });

export const onGetInventoryFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onAddInventoryAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onAddInventorySuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    getInventoryDetail: [...state.getInventoryDetail, data.newInventory]
  });

export const onAddInventoryFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onUpdateInventoryAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onUpdateInventorySuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    getInventoryDetail: [
      ...state.getInventoryDetail.filter((x) => x._id !== data.newInventory._id),
      data.newInventory
    ]
  });

export const onUpdateInventoryFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onGetInventoryTypesAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetInventoryTypesSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    inventoryTypes: data.inventoryTypes
  });

export const onGetInventoryTypesFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const inventoryReducer = createReducer(INITIAL_STATE, {
  [Types.GET_INVENTORY_ACTION]: onGetInventoryAction,
  [Types.GET_INVENTORY_SUCCESS]: onGetInventorySuccess,
  [Types.GET_INVENTORY_FAILURE]: onGetInventoryFailure,
  [Types.ADD_INVENTORY_ACTION]: onAddInventoryAction,
  [Types.ADD_INVENTORY_SUCCESS]: onAddInventorySuccess,
  [Types.ADD_INVENTORY_FAILURE]: onAddInventoryFailure,
  [Types.UPDATE_INVENTORY_ACTION]: onUpdateInventoryAction,
  [Types.UPDATE_INVENTORY_SUCCESS]: onUpdateInventorySuccess,
  [Types.UPDATE_INVENTORY_FAILURE]: onUpdateInventoryFailure,
  [Types.GET_INVENTORY_TYPES_ACTION]: onGetInventoryTypesAction,
  [Types.GET_INVENTORY_TYPES_SUCCESS]: onGetInventoryTypesSuccess,
  [Types.GET_INVENTORY_TYPES_FAILURE]: onGetInventoryTypesFailure
});
