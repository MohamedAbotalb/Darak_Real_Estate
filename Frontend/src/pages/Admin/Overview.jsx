import React, { lazy } from 'react';

const OverView = lazy(() => import('components/AdminDashboard/OverView'));

function OverviewPage() {
  return <OverView />;
}

export default OverviewPage;
