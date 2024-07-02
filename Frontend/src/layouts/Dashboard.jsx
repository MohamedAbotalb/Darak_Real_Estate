import React, { useState } from 'react';
import OverView from 'components/AdminDashboard/OverView';
import UserDetails from 'components/AdminDashboard/UserDetails';
import ReviewList from 'components/AdminDashboard/ReviewList';
import ReportUserList from 'components/ReportUserList';
import ReportPropertyList from 'components/ReportPropertyList';
import PropertyType from 'pages/PropertyType';
import Amenities from 'components/AdminDashboard/Amenities';
import im1 from 'assets/images/im1.PNG';
import im2 from 'assets/images/im2.PNG';
import Sidebar from './Sidebar';
import '../assets/css/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="main-content">
        <img src={im1} alt="Logo 1" className="dashboard-logo im1" />
        <img src={im2} alt="Logo 2" className="dashboard-logo im2" />
        {activeTab === 'overview' && (
          <div>
            <h1>Overview</h1>
            <OverView />
          </div>
        )}
        {activeTab === 'userdetails' && (
          <div>
            <h1>User Details</h1>
            <UserDetails />
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <h1>Reviews</h1>
            <ReviewList />
          </div>
        )}
        {activeTab === 'report-users' && (
          <div>
            <h1>Report Users</h1>
            <ReportUserList />
          </div>
        )}
        {activeTab === 'report_property' && (
          <div>
            <h1>Report Properties</h1>
            <ReportPropertyList />
          </div>
        )}
        {activeTab === 'property-types' && (
          <div>
            <h1>Property Types</h1>
            <PropertyType />
          </div>
        )}
        {activeTab === 'amenities' && (
          <div>
            <h1>Amenities</h1>
            <Amenities />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
