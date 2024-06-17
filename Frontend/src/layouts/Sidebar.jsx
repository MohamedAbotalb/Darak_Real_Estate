import React from 'react';
import './Sidebar.css';

function Sidebar({ setActiveTab }) {
    return (
        <div className="sidebar">
            <h2>Dashboard Menu</h2>
            <ul>
                <li onClick={() => setActiveTab('user_details')}>User Details</li>
                <li onClick={() => setActiveTab('report-users')}>Report User</li> 
                <li onClick={() => setActiveTab('report_property')}>Report Property</li>
                <li onClick={() => setActiveTab('reviews')}>Reviews</li>
                <li onClick={() => setActiveTab('property_types')}>Property Types</li>
            </ul>
        </div>
    );
}

export default Sidebar;
