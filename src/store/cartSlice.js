/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
if (sessionStorage.getItem('cart') == null) {
  sessionStorage.setItem('cart', JSON.stringify([]));
}

let cart = createSlice({
  name: 'cart',
  initialState: JSON.parse(sessionStorage.getItem('cart')),
  reducers: {
    setCart(state, action) {
      sessionStorage.removeItem('cart');
      return [];
    },
    addToCart(state, action) {
      let product = state.find((product) => product.id === action.payload.id);
      if (!product) {
        state.push(action.payload);
      }
    },

    removeFromCart(state, action) {
      console.log(state, action.payload);
      state.splice(
        state.findIndex((product) => product.id === action.payload),
        1
      );
    },

    plusAmount(state, action) {
      let product = state.find((product) => product.id === action.payload);
      product.amount++;
    },
    minusAmount(state, action) {
      let product = state.find((product) => product.id === action.payload);
      if (product.amount > 1) {
        product.amount--;
      }
    },
  },
});

export let { addToCart, removeFromCart, plusAmount, minusAmount, setCart } = cart.actions;

export default cart;
