import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const response = await axios.get('https://fakestoreapi.com/products');

let products = createSlice({
  name: 'products',
  initialState: response.data,
  reducers: {},
});

export let { setProductsSlice } = products.actions;

export default products;
