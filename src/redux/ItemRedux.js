import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  itemRequest: ['payload'],
  itemSuccess: ['data'],
  editItemRequest: ['payload'],
  editItemSuccess: ['data'],
  itemFailure: ['error'],
  logout: null
});

export const ItemTypes = Types;
const ItemActions = Creators;
export default ItemActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  list: [],
  fetching: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const ItemSelectors = {
  getItems: (state) => state.items.list,
  getItemById: (id) => (state) => state.items.list.find((x) => x._id === id),
  getItemsByInventoryId: (id) => (state) =>
    state.items.list.filter((x) => x.widgetFamily?.inventory === id)
};

/* ------------- Reducers ------------- */
export const onItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onEditItemRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

const mergeItemStates = (stateData, items) => {
  if (!items) return stateData; // undefined check

  const idsInNewItems = items.map((x) => x._id);

  const newState = stateData.filter((x) => !idsInNewItems.includes(x._id));

  return [...newState, ...items];
};

export const onItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    list: mergeItemStates(state.list, data.items)
  });

const mergeEditItemStates = (stateList, item, type) => {
  if (!item) return stateList; // undefined check

  if (type === 'add') {
    return [...stateList, item];
  } else if (type === 'edit') {
    const newState = stateList.filter((x) => x._id !== item._id);
    return [...newState, item];
    // } else if (type === 'delete') {
    //   return stateList.filter((x) => x._id !== item._id);
  } else {
    return stateList;
  }
};

export const onEditItemSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    list: mergeEditItemStates(state.list, data.item, data.type)
  });

export const onItemFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const itemReducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_REQUEST]: onItemRequest,
  [Types.EDIT_ITEM_REQUEST]: onEditItemRequest,
  [Types.ITEM_SUCCESS]: onItemSuccess,
  [Types.EDIT_ITEM_SUCCESS]: onEditItemSuccess,
  [Types.ITEM_FAILURE]: onItemFailure
});
