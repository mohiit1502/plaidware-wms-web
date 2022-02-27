import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import LOGGER from 'services/Logger';
import _ from 'underscore';
import { getChildLocationType } from 'utils/nestedTableTools';
import { getFetchingValue, getErrorValue } from '../services/Utils';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  locationRequest: ['payload'],
  locationSuccess: ['data'],
  locationFailure: ['error'],
  addLocationRequest: ['payload'],
  editLocationRequest: ['payload'],
  deleteLocationRequest: ['payload']
});

export const WarehouseLocationsTypes = Types;
const WarehouseLocationsActions = Creators;
export default WarehouseLocationsActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  childData: [],
  fetching: [],
  error: {}
});

/* ------------- Selectors ------------- */
export const WarehouseLocationsSelectors = {
  getChildData: (state) => state.warehouseLocations.childData,
  getChildrenOfParent: (id) => (state) =>
    state.warehouseLocations.childData?.filter((c) => c.parentId === id),
  // getChildrenOfParent: (id) => () => sampleState?.filter((c) => c.parentId === id),
  fetching: (state) => state.warehouseLocations.fetching
};

/* ------------- Reducers ------------- */
export const onLocationRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

const mapResponseToNestedTable = (stateData, childData) => {
  if (!childData) return stateData; // undefined check
  let newChildren;

  // incase edited
  if (childData.edited) {
    newChildren = childData?.childrenData.map((child) => ({
      ...child,
      id: child._id,
      location: childData.child.type,
      parentId: childData.child.parentId
    }));
  } else if (!childData.deleted) {
    // created
    newChildren = childData?.childrenData.map((child) => ({
      ...child,
      id: child._id,
      location: getChildLocationType(childData.parent.type),
      parentId: childData.parent.id
    }));
  }

  if (childData.deleted) {
    return stateData.filter((x) => x.id !== childData?.deleted?.id);
  } else {
    const idsInNewChildren = newChildren.map((st) => st.id);

    const newState = stateData.filter((st) => !idsInNewChildren.includes(st.id));

    return [...newState, ...newChildren];
  }
};

export const onLocationSuccess = (state, { data }) => {
  LOGGER.log('From onLocationSuccess', state, data);
  return state.merge({
    fetching: getFetchingValue(state.fetching, data?.loader),
    error: getErrorValue(state?.error, data?.loader),
    childData: mapResponseToNestedTable(state.childData, data?.childData)
  });
};
export const onLocationFailure = (state, { error }) =>
  state.merge({
    fetching: _.without(state.fetching, error?.loader),
    error: { ...state.error, [error?.loader]: error?.error }
  });

export const onAddLocationRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onEditLocationRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

export const onDeleteLocationRequest = (state, { payload }) =>
  state.merge({
    fetching: _.uniq([...state.fetching, payload?.loader]),
    error: getErrorValue(state?.error, payload?.loader)
  });

/* ------------- Hookup Reducers To Types ------------- */
export const WarehouseLocationsReducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_REQUEST]: onLocationRequest,
  [Types.LOCATION_SUCCESS]: onLocationSuccess,
  [Types.LOCATION_FAILURE]: onLocationFailure,
  [Types.ADD_LOCATION_REQUEST]: onAddLocationRequest,
  [Types.EDIT_LOCATION_REQUEST]: onEditLocationRequest,
  [Types.DELETE_LOCATION_REQUEST]: onDeleteLocationRequest
});
