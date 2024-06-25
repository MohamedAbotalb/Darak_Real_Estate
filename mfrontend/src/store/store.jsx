// store.js
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesSlice';
import wishlistReducer from './wishlistSlice';
import categoriesReducer from './categoriesSlice';

const reduxStore = configureStore({
  reducer: {
    properties: propertiesReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
  },
});

export default reduxStore;
