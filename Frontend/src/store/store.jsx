// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import reportUsersReducer from './reportUsersSlice';
import reportPropertiesReducer from './reportPropertiesSlice';
import propertyReducer from './propertySlice';

const reduxStore = configureStore({
  reducer: {
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
  },
});

export default reduxStore;
