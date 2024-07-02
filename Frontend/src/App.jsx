import React from 'react';
import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminRoutes from 'layouts/Admin-routes';
import UserLayout from 'layouts/UserLayout';
import PropertyDetails from 'components/PropertyDetails';
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
import SearchPage from 'pages/Search';
import ProfilePage from 'pages/Profile';
import MyProperties from 'pages/MyProperties';
import MyTours from 'pages/MyTours';
import ProtectedRoute from 'ProtectedRoute';
import RenterNotifications from 'components/Home/Notifications/RenterNotifications';
import LandlordNotifications from 'components/Home/Notifications/LandlordNotifications';
import SharedLayout from 'layouts/SharedLayout-Dashboard';

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
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="add-property" element={<AddPropertyPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="landlord-notifications"
            element={<LandlordNotifications />}
          />
          <Route
            path="renter-notifications"
            element={<RenterNotifications />}
          />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myproperties" element={<MyProperties />} />
        <Route path="/mytours" element={<MyTours />} />
        {/* authenticated admin dashboard routes */}
        <Route path="/admin" element={<SharedLayout />} roles={['admin']}>
          <Route path="*" element={<AdminRoutes />} />
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
