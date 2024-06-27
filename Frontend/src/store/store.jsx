import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/Auth/authSlice';
import reportUsersReducer from 'store/reportUsersSlice';
import reportPropertiesReducer from 'store/reportPropertiesSlice';
import propertyReducer from 'store/propertySlice';
import propertyTypesReducer from 'store/propertyTypesSlice';
import propertiesReducer from 'store/propertiesSlice';
import wishlistReducer from 'store/wishlistSlice';
import categoriesReducer from 'store/categoriesSlice';
import overviewReducer from 'store/overviewSlice';
import userDetailsReducer from 'store/userDetailsSlice';
import amenitiesReducer from 'store/amenitiesSlice';
import locationsReducer from 'store/locationsSlice';

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
    propertyTypes: propertyTypesReducer,
    properties: propertiesReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    overview: overviewReducer,
    userDetails: userDetailsReducer,
    amenities: amenitiesReducer,
    locations: locationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
