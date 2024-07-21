import React, { lazy } from 'react';

const AmenityTable = lazy(
  () => import('components/AdminDashboard/Amenities/AmenityTable')
);

function AmenitiesPage() {
  return <AmenityTable />;
}

export default AmenitiesPage;
