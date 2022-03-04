import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  itemRequest: ['payload'],
  itemSuccess: ['data'],
  itemFailure: ['error'],
  addItemRequest: ['payload'],
  addItemSuccess: ['data'],
  editItemRequest: ['payload'],
  editItemSuccess: ['data'],
  deleteItemRequest: ['payload'],
  deleteItemSuccess: ['data'],
  oneItemRequest: ['payload'],
  oneItemSuccess: ['data']
});

export const ItemTypes = Types;
const ItemActions = Creators;
export default ItemActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  list: [],
  item: null,
  count: 0,
  fetching: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const ItemSelectors = {
  getItems: (state) => state.items.list,
  getFormItem: (itemId) => (state) => state.items.item?._id === itemId ? state.items.item : null,
  getItemsCount: (state) => state.items.count,
  getItemById: (id) => (state) => state.items.list.find((x) => x._id === id)
};

/* ------------- Reducers ------------- */
export const onItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    list: data.items,
    count: data.count
  });

export const onOneItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onOneItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    item: data.item
  });

export const onAddItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onAddItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    item: null
  });

export const onEditItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onEditItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    item: null
  });

export const onDeleteItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onDeleteItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader)
  });

export const onItemFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const itemReducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_REQUEST]: onItemRequest,
  [Types.ITEM_SUCCESS]: onItemSuccess,
  [Types.ITEM_FAILURE]: onItemFailure,
  [Types.ADD_ITEM_REQUEST]: onAddItemRequest,
  [Types.ADD_ITEM_SUCCESS]: onAddItemSuccess,
  [Types.EDIT_ITEM_REQUEST]: onEditItemRequest,
  [Types.EDIT_ITEM_SUCCESS]: onEditItemSuccess,
  [Types.DELETE_ITEM_REQUEST]: onDeleteItemRequest,
  [Types.DELETE_ITEM_SUCCESS]: onDeleteItemSuccess,
  [Types.ONE_ITEM_REQUEST]: onOneItemRequest,
  [Types.ONE_ITEM_SUCCESS]: onOneItemSuccess
});
