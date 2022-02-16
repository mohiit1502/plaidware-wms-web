import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';
import WarehouseSaga from './Warehouse';
import UsersSaga from './Users';
import ProductSaga from './Product';
import RolesSaga from './Roles';

export default function* rootSaga() {
  yield all([...AuthSaga]);
  yield all([...WarehouseSaga]);
  yield all([...UsersSaga]);
  yield all([...ProductSaga]);
  yield all([...RolesSaga]);
}
