import contactsReducer from './contacts/contacts-reducer';
import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

const contactsPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const store = configureStore({
  reducer: { contacts: persistReducer(contactsPersistConfig, contactsReducer) },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  // devTools: process.env.NODE_ENV === 'development',
  devTools: true,
});

export const persistor = persistStore(store);
