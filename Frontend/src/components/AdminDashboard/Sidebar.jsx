import React from 'react';
import { NavLink } from 'react-router-dom';
import 'assets/css/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/admin/overview"
            className="nav-link"
            activeClassName="active-link"
          >
            OverView
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/user-details"
            className="nav-link"
            activeClassName="active-link"
          >
            User Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/user-complaints"
            className="nav-link"
            activeClassName="active-link"
          >
            User Complaints
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/property-issues"
            className="nav-link"
            activeClassName="active-link"
          >
            Property Issues
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reviews"
            className="nav-link"
            activeClassName="active-link"
          >
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/property-types"
            className="nav-link"
            activeClassName="active-link"
          >
            Property Types
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/amenities"
            className="nav-link"
            activeClassName="active-link"
          >
            Amenities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/property-ads"
            className="nav-link"
            activeClassName="active-link"
          >
            Property Ads
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
