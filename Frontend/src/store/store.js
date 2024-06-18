// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import reportUsersReducer from './reportUsersSlice';
import reportPropertiesReducer from './reportPropertiesSlice';

const reduxStore = configureStore({
  reducer: {
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
  },
});

export default reduxStore;
