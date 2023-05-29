import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'eventhub',
  storage,
};

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
