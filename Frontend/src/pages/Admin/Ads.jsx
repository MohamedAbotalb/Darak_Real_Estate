import React, { lazy } from 'react';

const AdsTable = lazy(() => import('components/AdminDashboard/AdsTable'));

function Ads() {
  return <AdsTable />;
}

export default Ads;
