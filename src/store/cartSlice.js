/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
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
    inputAmount(state, action) {
      let product = state.find((product) => product.id === action.payload.id);
      if (action.payload.input < 0) {
        product.amount = 0;
      } else {
        product.amount = action.payload.input;
      }
    },
  },
});

export let { addToCart, removeFromCart, plusAmount, minusAmount, setCart, inputAmount } = cart.actions;

export default cart;
