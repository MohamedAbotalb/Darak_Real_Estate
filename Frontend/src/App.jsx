import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReviewList from 'components/AdminDashboard/ReviewList';
import ReportUserList from 'components/AdminDashboard/ReportUserList';
import ReportPropertyList from 'components/AdminDashboard/ReportPropertyList';
import PropertyTypes from 'pages/PropertyType';
import Amenities from 'pages/Amenities';
import OverView from 'components/AdminDashboard/OverView';
import UserDetails from 'components/AdminDashboard/UserDetails';
import UserLayout from 'layouts/UserLayout';
import PropertyDetails from 'components/PropertyDetails';
import PropertiesPage from 'pages/Properties';
import WishlistPage from 'pages/Wishlist';
import NotFoundPage from 'pages/NotFound';
import ForbiddenPage from 'pages/Forbidden';
import RegisterPage from 'pages/Auth/Register';
import LoginPage from 'pages/Auth/Login';
import ForgetPasswordPage from 'pages/Auth/ForgetPassword';
import ResetPasswordPage from 'pages/Auth/ResetPassword';
import HomePage from 'pages/Home';
import AboutPage from 'pages/About';
import AddPropertyPage from 'pages/AddProperty';
import ProfilePage from 'pages/Profile';
import MyProperties from 'pages/MyProperties';
import MyTours from 'pages/MyTours';
import ProtectedRoute from 'ProtectedRoute';
import UserNotifications from 'components/Home/Notifications/UserNotifications';
import LandlordNotifications from 'components/Home/Notifications/LandlordNotifications';
import SharedLayout from 'layouts/AdminLayout';
import PriceFilter from 'components/PropertySearch/test';

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
          <Route path="about" element={<AboutPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="price" element={<PriceFilter />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="add-property" element={<AddPropertyPage />} />
          <Route
            path="landlord-notifications"
            element={<LandlordNotifications />}
          />
          <Route path="user-notifications" element={<UserNotifications />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myproperties" element={<MyProperties />} />
        <Route path="/mytours" element={<MyTours />} />
        {/* authenticated admin dashboard routes */}
        <Route path="/admin" element={<SharedLayout />}>
          <Route index element={<OverView />} />
          <Route path="overview" element={<OverView />} />
          <Route path="user-details" element={<UserDetails />} />
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
