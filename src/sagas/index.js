import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';
import WarehouseSaga from './Warehouse';
import UsersSaga from './Users';
import ProductSaga from './Product';
import InventorySaga from './Inventory';
import RolesSaga from './Roles';
import WarehouseLocationsSaga from './WarehouseLocations';
import WidgetSaga from './Widget';
import ItemSaga from './Item';

export default function* rootSaga() {
  yield all([...AuthSaga]);
  yield all([...WarehouseSaga]);
  yield all([...UsersSaga]);
  yield all([...ProductSaga]);
  yield all([...InventorySaga]);
  yield all([...RolesSaga]);
  yield all([...WarehouseLocationsSaga]);
  yield all([...WidgetSaga]);
  yield all([...ItemSaga]);
}
