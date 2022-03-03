import { AuthorizedAPI } from 'config';
import { takeLatest, call, put } from 'redux-saga/effects';
import LabellingActions from 'redux/LabellingRedux';
import { LabellingTypes } from 'redux/LabellingRedux';
import ApiServices from 'services/API/ApiServices';

export function* onRequestGetLabelData({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      LabellingActions.getLabelSuccess({
        loader: payload?.loader,
        getLabelDetail: response?.data?.data
      })
    );
  } else {
    payload.onFailedGetLabelData(response.data.error);
    yield put(
      LabellingActions.getLabelFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}
export default [takeLatest(LabellingTypes.GET_LABEL_ACTION, onRequestGetLabelData)];
