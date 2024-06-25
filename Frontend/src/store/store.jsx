// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import reportUsersReducer from './reportUsersSlice';
import reportPropertiesReducer from './reportPropertiesSlice';
import propertyReducer from './propertySlice';
import propertyTypesReducer from './propertyTypesSlice';
import propertiesReducer from './propertiesSlice';
import wishlistReducer from './wishlistSlice';
import categoriesReducer from './categoriesSlice';

const reduxStore = configureStore({
  reducer: {
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
    propertyTypes: propertyTypesReducer,
    properties: propertiesReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
  },
});

export default reduxStore;
