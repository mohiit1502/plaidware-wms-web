import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPermissionsAction: ['payload'],
  getPermissionsSuccess: ['data'],
  getPermissionsFailure: ['error'],

  getActionsAction: ['payload'],
  getActionsSuccess: ['data'],
  getActionsFailure: ['error']
});

export const PermissionsTypes = Types;
const PermissionsActions = Creators;
export default PermissionsActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  permissionsDetail: [],
  permissionsLoading: false,
  permissionserror: {},
  actionsDetail: [],
  actionsLoading: false,
  actionsError: {}
});

/* ------------- Selectors ------------- */
export const PermissionsSelectors = {
  getPermissionsDetail: (state) => state.permissions.permissionsDetail,
  getActionsDetail: (state) => state.permissions.actionsDetail
};

/* ------------- Reducers ------------- */
export const onGetPermissionsAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetPermissionsSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    permissionsDetail: data.permissionsDetail
  });

export const onGetPermissionsFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onGetActionsFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onGetActionsAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetActionsSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    actionsDetail: data.actionsDetail
  });

/* ------------- Hookup Reducers To Types ------------- */
export const permissionsReducer = createReducer(INITIAL_STATE, {
  [Types.GET_PERMISSIONS_ACTION]: onGetPermissionsAction,
  [Types.GET_PERMISSIONS_SUCCESS]: onGetPermissionsSuccess,
  [Types.GET_PERMISSIONS_FAILURE]: onGetPermissionsFailure,
  [Types.GET_ACTIONS_ACTION]: onGetActionsAction,
  [Types.GET_ACTIONS_SUCCESS]: onGetActionsSuccess,
  [Types.GET_ACTIONS_FAILURE]: onGetActionsFailure
});
