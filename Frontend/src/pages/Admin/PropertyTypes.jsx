import React, { lazy } from 'react';

const PropertyTypeTable = lazy(
  () => import('components/AdminDashboard/PropertyType/PropertyTypeTable')
);

function PropertyTypesPage() {
  return <PropertyTypeTable />;
}

export default PropertyTypesPage;
