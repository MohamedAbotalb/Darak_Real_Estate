import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ReviewList from '../components/ReviewList';
import ReportUserList from '../components/ReportUserList';
import ReportPropertyList from '../components/ReportPropertyList';
import './Dashboard.css';
import im1 from '../assets/images/im1.PNG';
import im2 from '../assets/images/im2.PNG';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div className="dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="main-content">
        <img src={im1} alt="Logo 1" className="dashboard-logo im1" />
        <img src={im2} alt="Logo 2" className="dashboard-logo im2" />
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
            <h1>Report properties</h1>
            <ReportPropertyList />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
