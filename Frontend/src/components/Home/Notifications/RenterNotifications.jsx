import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  fetchRenterNotifications  from 'store/notfications/notificationsSlice';

const RenterNotifications = () => {
  const dispatch = useDispatch();
  const { renterNotifications, status, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchRenterNotifications());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Renter Notifications</h2>
      <ul>
        {renterNotifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RenterNotifications;
