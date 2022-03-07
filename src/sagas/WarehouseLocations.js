import { AuthorizedAPI } from 'config';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import WarehouseLocationsActions from 'redux/WarehouseLocationsRedux';
import { WarehouseLocationsTypes } from 'redux/WarehouseLocationsRedux';
import ApiServices from 'services/API/ApiServices';
import LOGGER from 'services/Logger';
// import {
//   getError,
// } from '../services/Utils';

export function* onRequestLocation({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      WarehouseLocationsActions.locationSuccess({
        loader: payload?.loader,
        childData: response?.data?.data
      })
    );
  } else {
    payload.onFailedLocation(response.data.error);
    yield put(
      WarehouseLocationsActions.locationFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onAddRequestLocation({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  LOGGER.log('add response', response.data);
  if (response?.status === 200) {
    toast.success('Location created successfully', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationSuccess({
        loader: payload?.loader,
        childData: {
          parent: payload?.parent,
          childrenData: [{ ...response?.data }]
        }
      })
    );
  } else {
    toast.error('Failed to create warehouse location', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onDeleteRequestLocation({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  LOGGER.log('delete response', response.data);
  if (response?.status === 200) {
    toast.success('Location deleted successfully', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationSuccess({
        loader: payload?.loader,
        childData: { deleted: true, ...response?.data?.data }
      })
    );
  } else {
    toast.error('Failed to delete warehouse location', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export function* onEditRequestLocation({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  LOGGER.log('edit response', response.data);
  if (response?.status === 200) {
    toast.success('Location edited successfully', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationSuccess({
        loader: payload?.loader,
        childData: {
          edited: true,
          child: payload?.child,
          childrenData: [{ ...response?.data }]
        }
      })
    );
  } else {
    toast.error('Failed to edit warehouse location', {
      theme: 'colored'
    });
    yield put(
      WarehouseLocationsActions.locationFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [
  takeEvery(WarehouseLocationsTypes.LOCATION_REQUEST, onRequestLocation),
  takeEvery(WarehouseLocationsTypes.ADD_LOCATION_REQUEST, onAddRequestLocation),
  takeEvery(WarehouseLocationsTypes.EDIT_LOCATION_REQUEST, onEditRequestLocation),
  takeEvery(WarehouseLocationsTypes.DELETE_LOCATION_REQUEST, onDeleteRequestLocation)
];
