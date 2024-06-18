import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

function Sidebar({ setActiveTab }) {
  return (
    <div className="sidebar">
      <h2>Dashboard Menu</h2>
      <ul>
        <li>
          <button type="button" onClick={() => setActiveTab('user_details')}>
            User Details
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('report-users')}>
            Report User
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('report_property')}>
            Report Property
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('reviews')}>
            Reviews
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('property_types')}>
            Property Types
          </button>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default Sidebar;
