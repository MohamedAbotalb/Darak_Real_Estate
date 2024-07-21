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
import PropertyUpdatePage from 'pages/Admin/PropertyUpdate';
import PropertyUpdateDetailsPage from 'pages/PropertyUpdateDetails';
import PropertyTypesPage from 'pages/Admin/PropertyTypes';
import ReviewsPage from 'pages/Admin/Reviews';
import UserDetailsPage from 'pages/Admin/UserDetails';
import UserReportsPage from 'pages/Admin/UserReports';
import Ads from 'pages/Admin/Ads';
import PropertyDetailsPage from 'pages/PropertyDetails';
import PropertiesPage from 'pages/Properties';
import WishlistPage from 'pages/Wishlist';
import NotFoundPage from 'pages/NotFound';
import ForbiddenPage from 'pages/Forbidden';
import RegisterPage from 'pages/Auth/Register';
import LoginPage from 'pages/Auth/Login';
import AdminLoginPage from 'pages/Auth/AdminLogin';
import ForgetPasswordPage from 'pages/Auth/ForgetPassword';
import ResetPasswordPage from 'pages/Auth/ResetPassword';
import HomePage from 'pages/Home';
import AboutPage from 'pages/About';
import PropertyFormPage from 'pages/PropertyForm';
import ProfilePage from 'pages/Profile';
import MyProperties from 'pages/MyProperties';
import MyTours from 'pages/MyTours';
import UserNotifications from 'components/Home/Notifications/UserNotifications';
import LandlordNotifications from 'components/Home/Notifications/LandlordNotifications';
import 'typeface-josefin-sans';

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
          <Route path="properties/:slug" element={<PropertyDetailsPage />} />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute
                element={<WishlistPage />}
                roles={['user', 'landlord']}
              />
            }
          />
          <Route
            path="add-property"
            element={
              <ProtectedRoute
                element={<PropertyFormPage />}
                roles={['landlord']}
              />
            }
          />
          <Route
            path="edit-property/:slug"
            element={
              <ProtectedRoute
                element={<PropertyFormPage />}
                roles={['landlord']}
              />
            }
          />
          <Route
            path="landlord-notifications"
            element={
              <ProtectedRoute
                element={<LandlordNotifications />}
                roles={['landlord']}
              />
            }
          />
          <Route
            path="user-notifications"
            element={
              <ProtectedRoute
                element={<UserNotifications />}
                roles={['user']}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/myproperties"
            element={
              <ProtectedRoute element={<MyProperties />} roles={['landlord']} />
            }
          />
          <Route
            path="/mytours"
            element={<ProtectedRoute element={<MyTours />} roles={['user']} />}
          />
        </Route>

        {/* authenticated admin dashboard routes */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
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
          <Route path="user-complaints" element={<UserReportsPage />} />
          <Route path="property-issues" element={<PropertyReportsPage />} />
          <Route path="property-types" element={<PropertyTypesPage />} />
          <Route path="amenities" element={<AmenitiesPage />} />
          <Route path="property-ads" element={<Ads />} />
          <Route path="ads/:slug" element={<PropertyDetailsPage />} />
          <Route path="property-updates" element={<PropertyUpdatePage />} />
          <Route
            path="property-updates/:id/old"
            element={<PropertyUpdateDetailsPage />}
          />
          <Route
            path="property-updates/:id/new"
            element={<PropertyUpdateDetailsPage />}
          />
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
