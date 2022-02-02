import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';
import WarehouseSaga from './Warehouse';


export default function* rootSaga() {
  yield all([...AuthSaga]);
  yield all([...WarehouseSaga]);

}
