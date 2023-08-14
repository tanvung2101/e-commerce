import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import accountSlice from './accountSlice';
import productModalSlice from './productModalSlice';
import commonSlice from './commonSlice';
import cartItemSlice from './cartItemSlice';



const reducer = combineReducers({
  cartItem: cartItemSlice,
  account: accountSlice,
  productMadal: productModalSlice,
  common: commonSlice
})


const loggerMiddleware = (store) => (next) => (action) => {
  // your code here
  // console.log(action)

  // action.payload = 10
  next(action)
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false, }).concat(logger, loggerMiddleware)
})

export const persistor = persistStore(store)