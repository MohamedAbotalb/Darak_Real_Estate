import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminLayout from 'layouts/Dashboard';
import UserLayout from 'layouts/UserLayout';
import ReviewList from 'components/ReviewList';
import ReportUserList from 'components/ReportUserList';
import ReportPropertyList from 'components/ReportPropertyList';
import PropertyDetails from 'components/PropertyDetails';
import Wishlist from 'components/Home/Wishlist';
import PropertyTypes from 'pages/PropertyType';
import NotFoundPage from 'pages/NotFound';
import ForbiddenPage from 'pages/Forbidden';
import RegisterPage from 'pages/Auth/Register';
import LoginPage from 'pages/Auth/Login';
import ForgetPasswordPage from 'pages/Auth/ForgetPassword';
import ResetPasswordPage from 'pages/Auth/ResetPassword';
import Amenities from 'components/AdminDashboard/Amenities';
import OverView from 'components/AdminDashboard/OverView';
import UserDetails from 'components/AdminDashboard/UserDetails';
import HomePage from 'pages/Home';
import AddPropertyPage from 'pages/AddProperty';
import ProtectedRoute from 'ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from 'components/Home/Wishlist';
import Profile from 'pages/Profile';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="add-property" element={<AddPropertyPage />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        {/* authenticated admin dashboard routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminLayout />} roles={['admin']} />
          }
        >
          <Route path="overview" element={<OverView />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="report-users" element={<ReportUserList />} />
          <Route path="report-properties" element={<ReportPropertyList />} />
          <Route path="property-types" element={<PropertyTypes />} />
          <Route path="amenities" element={<Amenities />} />
        </Route>
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
