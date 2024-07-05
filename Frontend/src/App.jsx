import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminLayout from 'layouts/AdminLayout';
import UserLayout from 'layouts/UserLayout';
import ProtectedRoute from 'utils/ProtectedRoute';
import AmenitiesPage from 'pages/Admin/Amenities';
import OverviewPage from 'pages/Admin/Overview';
import PropertyReportsPage from 'pages/Admin/PropertyReports';
import PropertyTypesPage from 'pages/Admin/PropertyTypes';
import ReviewsPage from 'pages/Admin/Reviews';
import UserDetailsPage from 'pages/Admin/UserDetails';
import UserReportsPage from 'pages/Admin/UserReports';
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
import AddPropertyPage from 'components/AddProperty';
import SearchPage from 'pages/Search';
import ProfilePage from 'pages/Profile';
import MyProperties from 'pages/MyProperties';
import MyTours from 'pages/MyTours';
import UserNotifications from 'components/Home/Notifications/UserNotifications';
import LandlordNotifications from 'components/Home/Notifications/LandlordNotifications';

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
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="add-property" element={<AddPropertyPage />} />
          <Route path="edit-property/:slug" element={<AddPropertyPage />} />
          <Route path="search" element={<SearchPage />} />
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
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminLayout />} roles={['admin']} />
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="user-details" element={<UserDetailsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="user-reports" element={<UserReportsPage />} />
          <Route path="property-reports" element={<PropertyReportsPage />} />
          <Route path="property-types" element={<PropertyTypesPage />} />
          <Route path="amenities" element={<AmenitiesPage />} />
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
