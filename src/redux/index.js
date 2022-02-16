import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';
import { warehouseReducer } from './WarehouseRedux';
import { usersReducer } from './UsersRedux';
import { productReducer } from './ProductsRedux';
import { rolesReducer } from './RolesRedux';

// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer,
  warehouse: warehouseReducer,
  users: usersReducer,
  product: productReducer,
  roles: rolesReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
