import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import im1 from 'assets/images/im1.PNG';
import im2 from 'assets/images/im2.PNG';

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={im1} alt="Logo 1" className="im1" />
      <h2>Dashboard Menu</h2>
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
            to="/admin/report-users"
            className="nav-link"
            activeClassName="active-link"
          >
            Report User
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/report_property"
            className="nav-link"
            activeClassName="active-link"
          >
            Report Property
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
      </ul>
      <img src={im2} alt="Logo 2" className="im2" />
    </div>
  );
}

export default Sidebar;
