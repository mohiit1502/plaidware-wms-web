import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  widgetRequest: ['payload'],
  widgetSuccess: ['data'],
  editWidgetRequest: ['payload'],
  editWidgetSuccess: ['data'],
  widgetFailure: ['error'],
  logout: null
});

export const WidgetTypes = Types;
const WidgetActions = Creators;
export default WidgetActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  list: [],
  fetching: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const WidgetSelectors = {
  getWidgets: (state) => state.widgets.list,
  getWidgetById: (id) => (state) => state.widgets.list.find((x) => x._id === id),
  getWidgetsByInventoryId: (id) => (state) =>
    state.widgets.list.filter((x) => x.inventory._id === id),
  getWidgetFamiliesByInventoryId: (id) => (state) =>
    state.widgets.list.filter((x) => !x.parent && x.inventory._id === id),
  getWidgetsByParentId: (id) => (state) => state.widgets.list.filter((x) => x.parent?._id === id)
};

/* ------------- Reducers ------------- */
export const onWidgetRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onEditWidgetRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

const mergeWidgetStates = (stateData, widgets) => {
  if (!widgets) return stateData; // undefined check

  const idsInNewWidgets = widgets.map((x) => x._id);

  const newState = stateData.filter((x) => !idsInNewWidgets.includes(x._id));

  return [...newState, ...widgets];
};

export const onWidgetSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    list: mergeWidgetStates(state.list, data.widgets)
  });

const mergeEditWidgetStates = (stateList, widget, type, deletedId) => {
  if (!(widget || deletedId)) return stateList; // undefined check

  if (type === 'add') {
    return [...stateList, widget];
  } else if (type === 'edit') {
    const newState = stateList.filter((x) => x._id !== widget._id);
    return [...newState, widget];
  } else if (type === 'delete') {
    return stateList.filter((x) => x._id !== deletedId);
  } else {
    return stateList;
  }
};

export const onEditWidgetSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    list: mergeEditWidgetStates(state.list, data.widget, data.type, data.deletedId)
  });

export const onWidgetFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const widgetReducer = createReducer(INITIAL_STATE, {
  [Types.WIDGET_REQUEST]: onWidgetRequest,
  [Types.EDIT_WIDGET_REQUEST]: onEditWidgetRequest,
  [Types.WIDGET_SUCCESS]: onWidgetSuccess,
  [Types.EDIT_WIDGET_SUCCESS]: onEditWidgetSuccess,
  [Types.WIDGET_FAILURE]: onWidgetFailure
});
