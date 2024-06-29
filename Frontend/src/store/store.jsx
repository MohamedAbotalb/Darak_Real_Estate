import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/Auth/authSlice';
import reportUsersReducer from 'store/reportUsersSlice';
import reportPropertiesReducer from 'store/reportPropertiesSlice';
import propertyReducer from 'store/propertySlice';
import propertyTypesReducer from 'store/propertyTypesSlice';
import propertyTypeReducer from 'store/home/propertyTypeSlice';
import propertiesReducer from 'store/home/propertiesSlice';
import wishlistReducer from 'store/home/wishlistSlice';
import categoriesReducer from 'store/home/categoriesSlice';
import overviewReducer from 'store/overviewSlice';
import userDetailsReducer from 'store/userDetailsSlice';
import amenitiesReducer from 'store/amenitiesSlice';
import locationsReducer from 'store/home/locationsSlice';
import notificationsReducer from 'store/notfications/notificationsSlice';

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
    propertyTypes: propertyTypesReducer,
    propertyType: propertyTypeReducer,
    properties: propertiesReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    overview: overviewReducer,
    userDetails: userDetailsReducer,
    amenities: amenitiesReducer,
    locations: locationsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
