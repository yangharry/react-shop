import { configureStore } from '@reduxjs/toolkit';
import cart from './store/cartSlice';
import user from './store/userSlice';
import products from './store/productsSlice';

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
    products: products.reducer,
  },
});
