import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  logout: null
});

export const AuthTypes = Types;
const AuthActions = Creators;
export default AuthActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  user: null,
  fetching: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const AuthSelectors = {
  getUser: (state) => state.auth.user,
  getAuthData: (state) => state.auth,
  fetching: (state) => state.fetching
};

/* ------------- Reducers ------------- */
export const onLoginRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onLoginSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    user: data.user
  });

export const onLoginFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onLogout = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const authReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: onLoginRequest,
  [Types.LOGIN_SUCCESS]: onLoginSuccess,
  [Types.LOGIN_FAILURE]: onLoginFailure,
  [Types.LOGOUT]: onLogout
});
