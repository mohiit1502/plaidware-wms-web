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
  editLocationRequest: ['payload']
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
  } else {
    // created
    newChildren = childData?.childrenData.map((child) => ({
      ...child,
      id: child._id,
      location: getChildLocationType(childData.parent.type),
      parentId: childData.parent.id
    }));
  }

  const idsInNewChildren = newChildren.map((st) => st.id);

  const newState = stateData.filter((st) => !idsInNewChildren.includes(st.id));

  return [...newState, ...newChildren];
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

/* ------------- Hookup Reducers To Types ------------- */
export const WarehouseLocationsReducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_REQUEST]: onLocationRequest,
  [Types.LOCATION_SUCCESS]: onLocationSuccess,
  [Types.LOCATION_FAILURE]: onLocationFailure,
  [Types.ADD_LOCATION_REQUEST]: onAddLocationRequest,
  [Types.EDIT_LOCATION_REQUEST]: onEditLocationRequest
});

// const sampleState = [
//   {
//     parentId: '61cea720ccc4b530015164f0',
//     id: 132,
//     location: 'Zone',
//     name: 'Zone 1',
//     type: 'Type 1',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 132,
//     id: 154,
//     location: 'Area',
//     name: 'Area 1',
//     type: 'Type 1',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 154,
//     id: 254,
//     location: 'Row',
//     name: 'Row 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 154,
//     id: 233,
//     location: 'Row',
//     name: 'Row 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 233,
//     id: 254,
//     location: 'Bay',
//     name: 'Bay 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 233,
//     id: 954,
//     location: 'Bay',
//     name: 'Bay 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 954,
//     id: 4687,
//     location: 'Level',
//     name: 'Level 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 954,
//     id: 1264,
//     location: 'Level',
//     name: 'Level 2',
//     type: 'Type 2',
//     specifications: 'something really long, idk'
//   },
//   {
//     parentId: 132,
//     id: 133,
//     location: 'Area',
//     name: 'Area 1',
//     type: 'Type 1',
//     specifications: 'something really long, idk'
//   }
// ];
