import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserNotificationsAsync,
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
      dispatch(fetchUserNotificationsAsync());
    } else if (role === 'landlord') {
      dispatch(fetchLandlordNotificationsAsync());
    }
  }, [dispatch]);
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const lastFourNotifications = sortedNotifications.slice(
    Math.max(notifications.length - 4, 0)
  );

  const pendingNotificationsCount =
    role === 'landlord'
      ? notifications.filter(
          (notification) => notification.status === 'pending'
        ).length
      : notifications.length;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    handleMenuClose();
    if (role === 'user') {
      navigate('/user-notifications');
    } else if (role === 'landlord') {
      navigate('/landlord-notifications');
    }
  };

  const handleShowAllNotifications = () => {
    handleMenuClose();
    if (role === 'user') {
      navigate('/user-notifications');
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

  const getNotificationCircleColor = (type) => {
    switch (type) {
      case 'declined':
        return '#FFCCCC';
      case 'approved':
        return '#CCFFCC';
      case 'pending':
        return '#f1b565';
      default:
        return '#FFFFFF';
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
        <Badge badgeContent={pendingNotificationsCount} color="error">
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
                  key={notification?.id}
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
                        borderLeft: `5px solid ${getBorderColor(notification?.tour?.status)}`,
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
                            alt={notification?.landlord.first_name}
                            src={notification?.landlord.avatar}
                          />
                        </ListItemAvatar>
                        <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                          <Typography variant="subtitle1">
                            {notification?.landlord?.first_name}{' '}
                            {notification?.landlord?.last_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 1 }}
                          >
                            {moment(notification?.created_at).format(
                              'MMMM DD, YYYY hh:mm A'
                            )}
                          </Typography>
                          <Typography variant="body1">
                            {notification?.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ) : (
                    <Box
                      key={notification?.id}
                      sx={{
                        marginBottom: 2,
                        transition: 'transform 0.3s ease',
                        transform:
                          hoveredNotification === notification?.id
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
                          width: '100%',
                          padding: 2,
                          borderRadius: 4,
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                        }}
                      >
                        {/* Top row: Profile image, username, and notification time */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {/* Colorful circle */}
                          <Box
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: getNotificationCircleColor(
                                notification?.status
                              ),
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                            }}
                          />
                          <Box display="flex" alignItems="center" marginTop={1}>
                            <Avatar
                              alt={notification?.user?.first_name}
                              src={notification?.user?.avatar}
                              sx={{ marginLeft: '28px', marginRight: '12px' }}
                            />
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ marginRight: 'auto' }}
                            >
                              {`${notification?.user?.first_name} ${notification?.user?.last_name}`}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {getTimeDisplay(notification?.created_at)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                            }}
                          />
                        </Box>

                        {/* Second row: Notification message and dates */}
                        <Typography
                          variant="body2"
                          sx={{
                            marginBottom: '16px',
                            marginLeft: { xs: '0', md: '85px' },
                            textAlign: { sm: 'center', md: 'left', lg: 'left' },
                          }}
                        >
                          {notification?.message}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: {
                              xs: 'column',
                              sm: 'column',
                              md: 'row',
                            },
                            textAlign: {
                              xs: 'center',
                              sm: 'center',
                              md: 'left',
                            },
                            marginBottom: '16px',
                            marginLeft: { xs: '0', md: '75px' },
                            alignItems: 'center',
                          }}
                        >
                          <DateRangeIcon
                            sx={{
                              marginRight: '5px',

                              color: getNotificationCircleColor(
                                notification.status
                              ),
                            }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ display: 'flex', flexWrap: 'wrap' }}
                            >
                              {notification.tour &&
                                notification.tour.dates.map((date, index) => (
                                  <React.Fragment key={date.id}>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        color:
                                          date.approved === 1
                                            ? 'green'
                                            : 'inherit',
                                        marginLeft: index > 0 ? '10px' : '0px',
                                      }}
                                    >
                                      {moment(date.date).format(
                                        'MMMM DD, YYYY hh:mm A'
                                      )}
                                    </Typography>
                                  </React.Fragment>
                                ))}
                            </Typography>
                          </Box>
                        </Box>
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
