import { AuthorizedAPI } from 'config';
import { call, put, takeEvery } from 'redux-saga/effects';
import ApiServices from 'services/API/ApiServices';
import WidgetActions, { WidgetTypes } from '../redux/WidgetRedux';

export function* onRequestWidget({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      WidgetActions.widgetSuccess({
        loader: payload?.loader,
        widgets: response?.data?.data
      })
    );
  } else {
    yield put(
      WidgetActions.widgetFailure({
        loader: payload?.loader,
        error: response?.message
      })
    );
  }
}

export function* onEditRequestWidget({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      WidgetActions.editWidgetSuccess({
        loader: payload?.loader,
        widget: response?.data?.data,
        type: payload?.type
      })
    );
  } else {
    yield put(
      WidgetActions.widgetFailure({
        loader: payload?.loader,
        error: response?.message
      })
    );
  }
}

export default [
  takeEvery(WidgetTypes.WIDGET_REQUEST, onRequestWidget),
  takeEvery(WidgetTypes.EDIT_WIDGET_REQUEST, onEditRequestWidget)
];
