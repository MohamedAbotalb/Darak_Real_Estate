import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import ReportUserList from '../components/ReportUserList';
import ReportPropertyList from '../components/ReportPropertyList';
import PropertyTypes from '../pages/PropertyType';
import Amenities from '../components/AdminDashboard/Amenities';
import OverView from '../components/AdminDashboard/OverView';
import UserDetails from '../components/AdminDashboard/UserDetails';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="overview" element={<OverView />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="reviews" element={<ReviewList />} />
      <Route path="report-users" element={<ReportUserList />} />
      <Route path="report-properties" element={<ReportPropertyList />} />
      <Route path="property-types" element={<PropertyTypes />} />
      <Route path="amenities" element={<Amenities />} />
    </Routes>
  );
}

export default AdminRoutes;
