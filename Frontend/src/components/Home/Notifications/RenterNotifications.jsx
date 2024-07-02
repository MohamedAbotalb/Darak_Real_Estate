// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchRenterNotificationsAsync,
//   deleteNotificationAsync,
// } from 'store/Notifications/notificationsSlice';
// import { CircularProgress } from '@mui/material';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { green, red, orange, grey } from '@mui/material/colors';
// import moment from 'moment';
// import Pagination from '@mui/material/Pagination';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';

// function RenterNotifications() {
//   const dispatch = useDispatch();
//   const notificationsState = useSelector((state) => state.notifications);
//   const { notifications, status, error } = notificationsState; // Destructuring here

//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState('all');
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [notificationToDelete, setNotificationToDelete] = useState(null);
//   const [hoveredNotification, setHoveredNotification] = useState(null);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     dispatch(fetchRenterNotificationsAsync());
//   }, [dispatch]);

//   const handleDeleteNotification = (id) => {
//     dispatch(deleteNotificationAsync(id));
//     setDeleteConfirmationOpen(false);
//   };

//   const openDeleteConfirmation = (notification) => {
//     setNotificationToDelete(notification);
//     setDeleteConfirmationOpen(true);
//   };

//   const closeDeleteConfirmation = () => {
//     setDeleteConfirmationOpen(false);
//     setNotificationToDelete(null);
//   };

//   const getTimeDisplay = (createdAt) => {
//     const now = moment();
//     const notificationTime = moment(createdAt);
//     const diffInHours = now.diff(notificationTime, 'hours');

//     if (diffInHours < 3) {
//       return notificationTime.fromNow();
//     }
//     return notificationTime.format('MMMM DD, YYYY hh:mm A');
//   };

//   const getBorderColor = (notificationStatus) => {
//     switch (notificationStatus) {
//       case 'approved':
//         return green[500];
//       case 'declined':
//         return red[500];
//       default:
//         return orange[500];
//     }
//   };
//   const handleMouseEnter = (e, color) => {
//     e.currentTarget.style.color = color;
//   };

//   const handleMouseLeave = (e, color) => {
//     e.currentTarget.style.color = color;
//   };

//   // Calculate pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const filteredNotifications =
//     filter === 'all'
//       ? notifications
//       : notifications.filter(
//           (notification) => notification.tour.status === filter
//         );
//   const currentNotifications = filteredNotifications.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const pageCount = Math.ceil(filteredNotifications.length / itemsPerPage);

//   const handleChangePage = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//     setCurrentPage(1);
//   };

//   if (status === 'loading') {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         Error: {error}
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         marginRight: 3,
//         marginLeft: 3,
//       }}
//     >
//       <Box
//         sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
//       >
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel id="filter-label">Filter</InputLabel>
//           <Select
//             labelId="filter-label"
//             id="filter-select"
//             value={filter}
//             label="Filter"
//             onChange={handleFilterChange}
//           >
//             <MenuItem value="all">All</MenuItem>
//             <MenuItem value="declined">Declined</MenuItem>
//             <MenuItem value="approved">Approved</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>
//       {currentNotifications.length === 0 ? (
//         <Typography
//           variant="body1"
//           align="center"
//           height="100vh"
//           sx={{ marginTop: 4 }}
//         >
//           No notifications found.
//         </Typography>
//       ) : (
//         currentNotifications.map((notification) => (
//           <Box
//             key={notification.id}
//             sx={{
//               marginBottom: 2,
//               transition: 'transform 0.3s ease',
//               transform:
//                 hoveredNotification === notification.id
//                   ? 'scale(1.03)'
//                   : 'scale(1)',
//             }}
//             onMouseEnter={() => setHoveredNotification(notification.id)}
//             onMouseLeave={() => setHoveredNotification(null)}
//           >
//             <Paper
//               sx={{
//                 padding: 2,
//                 borderRadius: 4,
//                 boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//                 borderLeft: `5px solid ${getBorderColor(notification.tour.status)}`,
//                 display: 'flex',
//                 alignItems: 'center',
//                 position: 'relative',
//               }}
//             >
//               <Avatar
//                 alt={notification.landlord.first_name}
//                 src={notification.landlord.avatar}
//               />
//               <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
//                 <Typography variant="subtitle1">
//                   {`${notification.landlord.first_name} ${notification.landlord.last_name}`}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {getTimeDisplay(notification.created_at)}
//                 </Typography>
//                 <Typography variant="body1">{notification.message}</Typography>
//               </Box>
//               <IconButton
//                 aria-label="delete notification"
//                 onClick={() => openDeleteConfirmation(notification)}
//                 onMouseEnter={(e) => handleMouseEnter(e, red[500])}
//                 onMouseLeave={(e) => handleMouseLeave(e, grey[500])}
//                 sx={{ position: 'absolute', top: 5, right: 5 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Paper>
//           </Box>
//         ))
//       )}
//       <Box sx={{ marginTop: 2, alignSelf: 'center' }}>
//         <Pagination
//           count={pageCount}
//           page={currentPage}
//           onChange={handleChangePage}
//           color="primary"
//         />
//       </Box>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         open={deleteConfirmationOpen}
//         onClose={closeDeleteConfirmation}
//         aria-labelledby="delete-notification-modal-title"
//         aria-describedby="delete-notification-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography
//             id="delete-notification-modal-title"
//             variant="h6"
//             component="h2"
//             sx={{ marginBottom: 2 }}
//           >
//             Confirm Delete
//           </Typography>
//           <Typography
//             id="delete-notification-modal-description"
//             variant="body1"
//             sx={{ marginBottom: 2 }}
//           >
//             Are you sure you want to delete this notification?
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button onClick={closeDeleteConfirmation} color="primary">
//               Cancel
//             </Button>
//             <Button
//               onClick={() => handleDeleteNotification(notificationToDelete?.id)}
//               variant="contained"
//               color="error"
//             >
//               Delete
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default RenterNotifications;
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import secureLocalStorage from 'react-secure-storage';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/Auth/authSlice';
import { fetchWishlist } from 'store/home/wishlistSlice';
import {
  fetchRenterNotificationsAsync,
  fetchLandlordNotificationsAsync,
  clearNotifications,
} from 'store/Notifications/notificationsSlice';
import NotificationDropdown from 'components/Home/Notifications/NotificationDropdown';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const wishlist = useSelector((state) => state.wishlist.list);
  const notifications = useSelector((state) => state.notifications.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = secureLocalStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      dispatch(fetchWishlist());
      dispatch(clearNotifications());
      if (storedUser.role === 'user') {
        dispatch(fetchRenterNotificationsAsync());
      } else if (storedUser.role === 'landlord') {
        dispatch(fetchLandlordNotificationsAsync());
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      dispatch(clearNotifications());
      if (user.role === 'user') {
        dispatch(fetchRenterNotificationsAsync());
      } else if (user.role === 'landlord') {
        dispatch(fetchLandlordNotificationsAsync());
      }
    }
  }, [dispatch, user]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      className="header"
      sx={{ backgroundColor: '#2C3E50' }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          className="title"
          component={Link}
          to="/"
          sx={{ color: '#cdd0d8', textDecoration: 'none' }}
        >
          RentEZ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!isSmallScreen && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/rent"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              Rent
            </Button>
            <Button
              component={Link}
              to="/buy"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              Buy
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              About
            </Button>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn && !isSmallScreen ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleClose}
            >
              <NotificationDropdown role={user?.role} />
            </Menu>
            <IconButton color="inherit" component={Link} to="/wishlist">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileClick}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
              {user?.role === 'landlord' && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/my-properties"
                >
                  My Properties
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          !isSmallScreen && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{ color: '#cdd0d8', textTransform: 'none' }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ color: '#cdd0d8', textTransform: 'none' }}
              >
                Log in
              </Button>
            </Box>
          )
        )}
        {isSmallScreen && (
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/rent"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Rent" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/buy"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Buy" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/about"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="About" />
          </ListItem>
          {isLoggedIn ? (
            <>
              <ListItem
                button
                component={Link}
                to={
                  user?.role === 'landlord'
                    ? '/landlord-notifications'
                    : '/renter-notifications'
                }
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </ListItemIcon>
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/wishlist"
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <Badge badgeContent={wishlist.length} color="error">
                    <FavoriteIcon />
                  </Badge>
                </ListItemIcon>
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/profile"
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              {user?.role === 'landlord' && (
                <ListItem
                  button
                  component={Link}
                  to="/my-properties"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Properties" />
                </ListItem>
              )}
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleDrawerClose}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={handleDrawerClose}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
