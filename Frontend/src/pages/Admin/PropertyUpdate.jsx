import React, { lazy } from 'react';

const UpdatePropertyTable = lazy(
  () => import('components/AdminDashboard/UpdatePropertyTable')
);

function Update() {
  return (
    <div>
      <UpdatePropertyTable />
    </div>
  );
}

export default Update;
