import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReportPropertyList from 'components/ReportPropertyList';
import ReportUserList from 'components/ReportUserList';
import ReviewList from 'components/AdminDashboard/ReviewList';
import UserDetails from 'components/AdminDashboard/UserDetails';
import OverView from 'components/AdminDashboard/OverView';
import PropertyTypes from 'pages/Admin/PropertyType';
import Amenities from 'pages/Admin/Amenities';
import Ads from 'pages/Admin/Ads';
import PropertyDetailsPage from 'pages/PropertyDetails';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="overview" element={<OverView />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="reviews" element={<ReviewList />} />
      <Route path="user-complaints" element={<ReportUserList />} />
      <Route path="property-issues" element={<ReportPropertyList />} />
      <Route path="property-types" element={<PropertyTypes />} />
      <Route path="amenities" element={<Amenities />} />
      <Route path="property-ads" element={<Ads />} />
      <Route path="ads/:slug" element={<PropertyDetailsPage />} />
    </Routes>
  );
}

export default AdminRoutes;
