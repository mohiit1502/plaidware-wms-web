import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';
import { warehouseReducer } from './WarehouseRedux';
import { usersReducer } from './UsersRedux';
import { productReducer } from './ProductsRedux';
import { inventoryReducer } from './InventoryRedux';
import { rolesReducer } from './RolesRedux';
import { WarehouseLocationsReducer } from './WarehouseLocationsRedux';

// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer,
  warehouse: warehouseReducer,
  users: usersReducer,
  roles: rolesReducer,
  warehouseLocations: WarehouseLocationsReducer,
  product: productReducer,
  inventory: inventoryReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
