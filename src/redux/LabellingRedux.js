import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getLabelAction: ['payload'],
  getLabelSuccess: ['data'],
  getLabelFailure: ['error']
});

export const LabellingTypes = Types;
const LabellingActions = Creators;
export default LabellingActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  getLabelDetail: [],
  getLabelLoading: false,
  getLabelerror: {}
});

/* ------------- Selectors ------------- */
export const LabellingSelectors = {
  getLabelDetail: (state) => state.labelling.getLabelDetail
};

/* ------------- Reducers ------------- */
export const onGetLabelAction = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onGetLabelSuccess = (state, { data }) =>
  state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    getLabelDetail: data.getLabelDetail
  });

export const onGetLabelFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

/* ------------- Hookup Reducers To Types ------------- */
export const labellingReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LABEL_ACTION]: onGetLabelAction,
  [Types.GET_LABEL_SUCCESS]: onGetLabelSuccess,
  [Types.GET_LABEL_FAILURE]: onGetLabelFailure
});
