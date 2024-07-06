import React from 'react';
import { useSelector } from 'react-redux';
import CenteredTabs from 'components/UserProfile/UserTours/CenteredTabs';

function MyTours() {
  const { tours, isLoading } = useSelector((state) => state.tours);

  return (
    <div>
      <CenteredTabs tours={tours} isLoading={isLoading} />
    </div>
  );
}

export default MyTours;
