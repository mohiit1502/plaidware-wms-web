import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';
import WarehouseSaga from './Warehouse';
import UsersSaga from './Users';

export default function* rootSaga() {
  yield all([...AuthSaga]);
  yield all([...WarehouseSaga]);
  yield all([...UsersSaga]);
}
