import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchUserNotificationsAsync,
  fetchLandlordNotificationsAsync,
} from 'store/Notifications/notificationsSlice';
import {
  Badge,
  IconButton,
  Menu,
  ListItemAvatar,
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
  Button,
  Link as MuiLink,
} from '@mui/material';

import { green, red, orange } from '@mui/material/colors';
import moment from 'moment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Loader from 'components/Loader';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/system';

function NotificationOutlineIcon() {
  return (
    <SvgIcon viewBox="0 0 24 24" sx={{ color: '#000' }}>
      {/* Your SVG path or content here */}
      <path d="M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" />
    </SvgIcon>
  );
}

function NotificationDropdown({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const { notifications, status } = useSelector((state) => state.notifications);
  const AdminImage = 'logo.png';

  useEffect(() => {
    if (role === 'user') {
      dispatch(fetchUserNotificationsAsync());
    } else if (role === 'landlord') {
      dispatch(fetchLandlordNotificationsAsync());
    }
  }, [dispatch, role]);
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const lastFourNotifications = sortedNotifications.slice(0, 4);

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

  const CenteredButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  width: '70px',
  margin: '0 auto', // Center the button horizontally
  backgroundColor: 'transparent',
  color: '#000', // Text color
  border: 'none', // Remove default border
  fontWeight: 'bold',
  textTransform: 'none', // Preserve text case
  display: 'block', // Ensure it’s a block element for centering
  textAlign: 'center', // Center text inside button
  padding:'0',
  // Remove default focus styles if needed
  '&:focus': {
    outline: 'none',
  },

  // Hover styles
  '&:hover': {
    backgroundColor: 'transparent', // Adjust text color on hover
  },

  // Bottom border animation
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#EE2027', // Bottom border color
    transform: 'scaleX(0)', // Initial scale
    transformOrigin: 'bottom left',
    transition: 'transform 0.3s ease-in-out',
  },

  // Bottom border animation on hover
  '&:hover::after': {
    transform: 'scaleX(1)', // Animate to full width
    transformOrigin: 'bottom left',
  },
}));



const StyledLink = styled(MuiLink)(({ theme }) => ({
  textDecoration: 'none', // Remove underline
  '&:hover': {
    color:'#2d45c9', // Optional: Underline on hover
  },
   '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#EE2027', // Bottom border color
    transform: 'scaleX(0)', // Initial scale
    transformOrigin: 'bottom left',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const parseMessage = (message, additionalText, property) => {
  if (!message || !property) return message;

  const propertyTitle = property.title;
  const propertySlug = property.slug;

  // Check if the message contains " at "
  const splitMessage = message.split(' at ');

  // If the message does not contain " at ", return the message with additional text
  if (splitMessage.length === 1) {
    return (
      <>
        {message} <br />
        {additionalText}{' '}
        <StyledLink component={Link} to={`/properties/${propertySlug}`}>
          {propertyTitle}
        </StyledLink>
      </>
    );
  }

  // If the message contains " at ", split and format accordingly
  const [firstPart, datePart] = splitMessage;
  const formattedDate = getTimeDisplay(datePart);

  return (
    <>
      {firstPart} at{' '}
      <span style={{ color: 'green' }}>{formattedDate}</span>
      <br />
      {additionalText}{' '}
      <StyledLink component={Link} to={`/properties/${propertySlug}`}>
        {propertyTitle}
      </StyledLink>
    </>
  );
};

  const getBorderColor = (tourStatusBorder) => {
    switch (tourStatusBorder) {
      case 'approved':
        return green[500];
      case 'declined':
        return red[500];
      default:
        return 'transparent';
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

  const getTimeDisplay = (timestamp) => {
    return moment(timestamp).format('MMMM DD, YYYY hh:mm A');
  };

  const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#ed2128', // Custom color
      color: '#fff', // Text color
    },
  }));

  return (
    <>
      <IconButton
        aria-label="show notifications"
        color="inherit"
        onClick={handleMenuOpen}
        sx={{ backgroundColor: 'transparent' }}
      >
        <CustomBadge badgeContent={pendingNotificationsCount}>
          <NotificationOutlineIcon />
        </CustomBadge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: 600 } }}
      >
        <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column' }}>
          {status === 'loading' && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <Loader />
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
                  sx={{ mb: 1,width:'500px'}}
                >
                  {role === 'user' ? (
                    <Paper
                       sx={{
                        
                        padding: 2,
                        borderRadius: 2.5,
                        marginBottom:2,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRight: `18px solid ${getBorderColor(notification?.tour?.status)}`,
                        width: '100%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          position: 'relative',
                        }}
                      >
                        {notification.type === 'tour_property_update' ? (
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Avatar
                                alt="admin"
                                src={AdminImage}
                                sx={{ margin: '16px' }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                              <Box display="flex" flexDirection="column">
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Darak Team
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {getTimeDisplay(notification.created_at)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    marginTop: '8px',
                                    textAlign: {
                                      xs: 'center',
                                      md: 'left',
                                      lg: 'left',
                                    },
                                  }}
                                >
                                  {parseMessage(
                                    notification.message,
                                    'check updates from here ',
                                    notification.property
                                  )}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Avatar
                                alt={notification.from.first_name}
                                src={notification.from.avatar}
                                sx={{ margin: '16px' }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                              <Box display="flex" flexDirection="column">
                                <Typography variant="subtitle1">
                                  {`${notification.from.first_name} ${notification.from.last_name}`}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {getTimeDisplay(notification.created_at)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginTop: '8px' }}
                                >
                                 {parseMessage(
                                    notification.message,
                                    'request another tour ',
                                    notification.property
                                  )}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        )}
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
                          width: '500px',
                          padding: 2,
                          borderRadius: 5,
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                        }}
                      >
                        {/* Top row: Profile image, username, and notification time */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                            position: 'relative',
                          }}
                        >
                           {notification.type !== 'request' &&
                  notification.type !== 'deleted-tour' ? (
                    <Box display="flex" alignItems="center" marginTop={3}>
                      <Avatar
                        alt="admin"
                        src={AdminImage}
                        sx={{ marginLeft: '28px', marginRight: '12px' }}
                      />
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ marginRight: 'auto' }}
                      >
                        Darak Team
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        sx={{ marginLeft: { xs: '10px' } }}
                      >
                        {getTimeDisplay(notification.created_at)}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      {/* Colorful circle */}
                      {notification.type === 'request' &&( <Box
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
                      />)}
                      <Box display="flex" alignItems="center" marginTop={3}>
                        <Avatar
                          alt={notification.from.first_name}
                          src={notification.from.avatar}
                          sx={{ marginLeft: '28px', marginRight: '12px' }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ marginRight: 'auto' }}
                        >
                          {`${notification.from.first_name} ${notification.from.last_name}`}
                        </Typography>
                        <Typography
                          variant="body"
                          color="textSecondary"
                          sx={{ marginLeft: { xs: '10px' } }}
                        >
                          {getTimeDisplay(notification.created_at)}
                        </Typography>
                      </Box>
                    </>
                  )}
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
                        {notification.type === 'request' && (
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
                                          marginLeft:
                                            index > 0 ? '10px' : '0px',
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
                        )}
                      </Paper>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          <CenteredButton
      onClick={handleShowAllNotifications}
    >
      Show All
    </CenteredButton>
        </Box>
      </Menu>
    </>
  );
}

NotificationDropdown.propTypes = {
  role: PropTypes.oneOf(['user', 'landlord']).isRequired,
};

export default NotificationDropdown;
