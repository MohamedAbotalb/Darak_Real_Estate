import React, { lazy } from 'react';

const ReportUserList = lazy(
  () => import('components/AdminDashboard/ReportUserList')
);

function UserReportsPage() {
  return <ReportUserList />;
}

export default UserReportsPage;
