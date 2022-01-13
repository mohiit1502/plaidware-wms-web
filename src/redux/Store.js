import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../sagas';
import immutablePersistenceTransform from '../services/immutablePersistenceTransform';
import rootReducer from './index';
import { APP_ENV } from '../config';

const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware];

const persistConfig = {
  key: '@root',
  storage,
  blacklist: ['nav', 'navigation', 'network'],
  transforms: [immutablePersistenceTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware to redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middleWare);

const enhancers =
  APP_ENV.APP_MODE === 'development' ? composeEnhancers(middleware) : compose(middleware);

const store = createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

// Enable persistence
export default { store, persistor };
