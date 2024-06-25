import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from 'layouts/Dashboard';
import ReviewList from 'components/ReviewList';
import ReportUserList from 'components/ReportUserList';
import ReportPropertyList from 'components/ReportPropertyList';
import PropertyDetails from 'components/PropertyDetails';
import PropertyTypes from 'pages/PropertyType';
import NotFound from 'pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from 'pages/HomePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Dashboard />}>
          <Route path="reviews" element={<ReviewList />} />
          <Route path="report-users" element={<ReportUserList />} />
          <Route path="report-properties" element={<ReportPropertyList />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="property-types" element={<PropertyTypes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<HomePage />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
