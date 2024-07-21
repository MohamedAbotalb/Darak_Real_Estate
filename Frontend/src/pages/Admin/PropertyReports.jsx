import React, { lazy } from 'react';

const ReportPropertyList = lazy(
  () => import('components/AdminDashboard/ReportPropertyList')
);

function PropertyReportsPage() {
  return <ReportPropertyList />;
}

export default PropertyReportsPage;
