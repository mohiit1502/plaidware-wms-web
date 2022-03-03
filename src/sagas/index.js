import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';
import WarehouseSaga from './Warehouse';
import UsersSaga from './Users';
import ProductSaga from './Product';
import InventorySaga from './Inventory';
import RolesSaga from './Roles';
import PermissionsSaga from './Permissions';
import WarehouseLocationsSaga from './WarehouseLocations';
import WidgetSaga from './Widget';
import LabellingSaga from './Labelling';
import ItemSaga from './Item';

export default function* rootSaga() {
  yield all([...AuthSaga]);
  yield all([...WarehouseSaga]);
  yield all([...UsersSaga]);
  yield all([...ProductSaga]);
  yield all([...InventorySaga]);
  yield all([...RolesSaga]);
  yield all([...PermissionsSaga]);
  yield all([...WarehouseLocationsSaga]);
  yield all([...WidgetSaga]);
  yield all([...LabellingSaga]);
  yield all([...ItemSaga]);
}
