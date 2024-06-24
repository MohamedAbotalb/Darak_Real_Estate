import React from 'react';
import { Provider } from 'react-redux';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from 'layouts/Dashboard';
import ReviewList from 'components/ReviewList';
import ReportUserList from 'components/ReportUserList';
import ReportPropertyList from 'components/ReportPropertyList';
import PropertyDetails from 'components/PropertyDetails';
import PropertyTypes from 'pages/PropertyType';
import NotFound from 'pages/NotFound';
import OverView from 'components/AdminDashboard/OverView';
import UserDetails from 'components/AdminDashboard/UserDetails';
import Amenities from 'components/AdminDashboard/Amenities';
import reduxStore from './store/store';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Dashboard />}>
          <Route path="overview" element={<OverView />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="report-users" element={<ReportUserList />} />
          <Route path="report-properties" element={<ReportPropertyList />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="property-types" element={<PropertyTypes />} />
          <Route path="amenities" element={<Amenities />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
