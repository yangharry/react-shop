import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cart from './store/cartSlice';
import user from './store/userSlice';
import products from './store/productsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  cart: cart.reducer,
  user: user.reducer,
  products: products.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'],
};

export default configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
