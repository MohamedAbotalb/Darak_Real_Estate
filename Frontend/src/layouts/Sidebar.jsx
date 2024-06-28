import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

function Sidebar({ setActiveTab }) {
  return (
    <div className="sidebar">
      <h2>Dashboard Menu</h2>
      <ul>
        <li>
          <button type="button" onClick={() => setActiveTab('overview')}>
            OverView
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('userdetails')}>
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
          <button type="button" onClick={() => setActiveTab('property-types')}>
            Property Types
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setActiveTab('amenities')}>
            Amenities
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
