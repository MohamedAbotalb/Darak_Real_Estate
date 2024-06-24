import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './layouts/Dashboard';
import ReviewList from './components/ReviewList';
import ReportUserList from './components/ReportUserList';
import ReportPropertyList from './components/ReportPropertyList';
import PropertyDetails from './components/PropertyDetails';
import PropertyTypes from './pages/PropertyType';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/report-users" element={<ReportUserList />} />
        <Route path="/report-properties" element={<ReportPropertyList />} />
        <Route path="/properties/:slug" element={<PropertyDetails />} />
        <Route path="/property-types" element={<PropertyTypes />} />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
