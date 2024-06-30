import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRenterNotifications, fetchLandlordNotifications } from 'store/notifications/notificationsSlice';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationDropdown = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications } = useSelector((state) => state.notifications);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (role === 'renter') {
      dispatch(fetchRenterNotifications());
    } else if (role === 'landlord') {
      dispatch(fetchLandlordNotifications());
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowAllNotifications = () => {
    setAnchorEl(null); // Close dropdown on navigation
    if (role === 'renter') {
      navigate('/renter-notifications');
    } else if (role === 'landlord') {
      navigate('/landlord-notifications');
    }
  };

  return (
    <>
      <IconButton
        aria-label="show notifications"
        color="inherit"
        onClick={handleNotificationClick}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <ListItemText primary={notification.message} />
          </MenuItem>
        ))}
        <MenuItem onClick={handleShowAllNotifications}>
          <Typography variant="inherit">Show All</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
