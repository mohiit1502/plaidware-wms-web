import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';

// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
