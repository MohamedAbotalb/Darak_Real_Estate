import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchRenterNotificationsAsync,
  fetchLandlordNotificationsAsync,
} from 'store/Notifications/notificationsSlice';
import {
  Badge,
  IconButton,
  Menu,
  ListItemAvatar,
  Avatar,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { green, red, orange } from '@mui/material/colors';
import moment from 'moment';
import DateRangeIcon from '@mui/icons-material/DateRange';

function NotificationDropdown({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const { notifications, status } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (role === 'user') {
      dispatch(fetchRenterNotificationsAsync());
    } else if (role === 'landlord') {
      dispatch(fetchLandlordNotificationsAsync());
    }
  }, [dispatch]);

  const lastFourNotifications = notifications.slice(
    Math.max(notifications.length - 4, 0)
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    handleMenuClose();
    if (role === 'user') {
      navigate('/renter-notifications');
    } else if (role === 'landlord') {
      navigate('/landlord-notifications');
    }
  };

  const handleShowAllNotifications = () => {
    handleMenuClose();
    if (role === 'user') {
      navigate('/renter-notifications');
    } else if (role === 'landlord') {
      navigate('/landlord-notifications');
    }
  };

  const getBorderColor = (tourStatusBorder) => {
    switch (tourStatusBorder) {
      case 'approved':
        return green[500];
      case 'declined':
        return red[500];
      default:
        return orange[500];
    }
  };

  const getNotificationCircleColor = (tourStatusCircle) => {
    switch (tourStatusCircle) {
      case 'approved':
        return green[500];
      case 'declined':
        return red[500];
      default:
        return orange[500];
    }
  };

  const handleMouseEnter = (e, color) => {
    e.currentTarget.style.color = color;
  };

  const handleMouseLeave = (e, color) => {
    e.currentTarget.style.color = color;
  };

  const getTimeDisplay = (timestamp) => {
    return moment(timestamp).format('MMMM DD, YYYY hh:mm A');
  };

  return (
    <>
      <IconButton
        aria-label="show notifications"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: 500 } }}
      >
        <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
          {status === 'loading' && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <CircularProgress />
            </Box>
          )}
          {status === 'failed' && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <Typography variant="body2" color="error">
                No notifications found.
              </Typography>
            </Box>
          )}
          {status === 'succeeded' && notifications?.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <Typography variant="body2" color="textSecondary">
                No notifications found.
              </Typography>
            </Box>
          )}
          {status === 'succeeded' && notifications?.length > 0 && (
            <List sx={{ width: '100%', p: 0 }}>
              {lastFourNotifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  disablePadding
                  onClick={() => handleNotificationClick(notification)}
                  sx={{ mb: 1 }}
                >
                  {role === 'user' ? (
                    <Paper
                      sx={{
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        borderLeft: `5px solid ${getBorderColor(notification.tour.status)}`,
                        width: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar>
                          <Avatar
                            alt={notification.landlord.first_name}
                            src={notification.landlord.avatar}
                          />
                        </ListItemAvatar>
                        <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                          <Typography variant="subtitle1">
                            {notification.landlord.first_name}{' '}
                            {notification.landlord.last_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 1 }}
                          >
                            {moment(notification.created_at).format(
                              'MMMM DD, YYYY hh:mm A'
                            )}
                          </Typography>
                          <Typography variant="body1">
                            {notification.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ) : (
                    <Box
                      key={notification.id}
                      sx={{
                        marginBottom: 2,
                        transition: 'transform 0.3s ease',
                        transform:
                          hoveredNotification === notification.id
                            ? 'scale(1.03)'
                            : 'scale(1)',
                      }}
                      onMouseEnter={() =>
                        setHoveredNotification(notification.id)
                      }
                      onMouseLeave={() => setHoveredNotification(null)}
                    >
                      <Paper
                        key={notification.id}
                        elevation={3}
                        sx={{
                          padding: 2,
                          borderRadius: 4,
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px',
                            position: 'relative',
                          }}
                        >
                          <Box
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: getNotificationCircleColor(
                                notification.status
                              ),
                              position: 'absolute',
                              top: '5px',
                              left: '8px',
                            }}
                          />
                          <Box display="flex" alignItems="center" marginTop={3}>
                            <Avatar
                              alt={notification.landlord.first_name}
                              src={notification.landlord.avatar}
                              sx={{ marginLeft: '28px', marginRight: '12px' }}
                            />
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ marginRight: '12px' }}
                            >
                              {`${notification.user.first_name} ${notification.user.last_name}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {getTimeDisplay(notification.created_at)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box marginLeft="70px" marginTop="8px">
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              fontSize: '14px',
                              marginLeft: '20px',
                              textAlign: 'left',
                            }}
                          >
                            {notification.message}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <DateRangeIcon
                            sx={{ marginRight: '4px', marginLeft: '16px' }}
                          />
                          {notification.tour?.dates?.map((date) => (
                            <Typography
                              key={date.id}
                              variant="body2"
                              color="textSecondary"
                              sx={{ marginRight: '4px' }}
                            >
                              {moment(date.date).format('MMM DD, YYYY')}
                            </Typography>
                          ))}
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          mt={2}
                          gap={2}
                        />
                      </Paper>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          <Button
            variant="contained"
            onClick={handleShowAllNotifications}
            sx={{
              alignSelf: 'center',
              marginTop: '8px',
              backgroundColor: '#2C3E50',
              '&:hover': {
                backgroundColor: '#3b536b',
              },
            }}
          >
            Show All
          </Button>
        </Box>
      </Menu>
    </>
  );
}

NotificationDropdown.propTypes = {
  role: PropTypes.oneOf(['user', 'landlord']).isRequired,
};

export default NotificationDropdown;
