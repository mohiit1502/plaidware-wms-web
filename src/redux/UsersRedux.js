import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getUsersAction: ['payload'],
  getUsersSuccess: ['data'],
  getUsersFailure: ['error']
});

export const UsersTypes = Types;
const UsersActions = Creators;
export default UsersActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  usersDetail: [],
  usersLoading: false,
  userserror: {}
});

/* ------------- Selectors ------------- */
export const UsersSelectors = {
  getUsersDetail: (state) => state.users.usersDetail
};

/* ------------- Reducers ------------- */
export const onGetUsersAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetUsersSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    usersDetail: data.usersDetail
  });

export const onGetUsersFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const usersReducer = createReducer(INITIAL_STATE, {
  [Types.GET_USERS_ACTION]: onGetUsersAction,
  [Types.GET_USERS_SUCCESS]: onGetUsersSuccess,
  [Types.GET_USERS_FAILURE]: onGetUsersFailure
});
