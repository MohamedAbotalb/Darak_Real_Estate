import React, { lazy } from 'react';

const UserDetails = lazy(() => import('components/AdminDashboard/UserDetails'));

function UserDetailsPage() {
  return <UserDetails />;
}

export default UserDetailsPage;
