import { configureStore } from '@reduxjs/toolkit';
import reportUsersReducer from './reportUsersSlice';
import reportPropertiesReducer from './reportPropertiesSlice';
import propertyReducer from './propertySlice';
import propertyTypesReducer from './propertyTypesSlice';
import overviewReducer from './overviewSlice';
import userDetailsReducer from './userDetailsSlice';
import amenitiesReducer from './amenitiesSlice';

const reduxStore = configureStore({
  reducer: {
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
    propertyTypes: propertyTypesReducer,
    overview: overviewReducer,
    userDetails: userDetailsReducer,
    amenities: amenitiesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
