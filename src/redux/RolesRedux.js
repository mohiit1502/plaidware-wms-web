import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getRolesAction: ['payload'],
  getRolesSuccess: ['data'],
  getRolesFailure: ['error']
});

export const RolesTypes = Types;
const RolesActions = Creators;
export default RolesActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  rolesDetail: [],
  rolesLoading: false,
  roleserror: {}
});

/* ------------- Selectors ------------- */
export const RolesSelectors = {
  getRolesDetail: (state) => state.roles.rolesDetail
};

/* ------------- Reducers ------------- */
export const onGetRolesAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetRolesSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    rolesDetail: data.rolesDetail
  });

export const onGetRolesFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const rolesReducer = createReducer(INITIAL_STATE, {
  [Types.GET_ROLES_ACTION]: onGetRolesAction,
  [Types.GET_ROLES_SUCCESS]: onGetRolesSuccess,
  [Types.GET_ROLES_FAILURE]: onGetRolesFailure
});
