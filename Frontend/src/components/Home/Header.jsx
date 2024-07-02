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
import NotificationDropdown from './Notifications/NotificationDropdown';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  // useEffect(() => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //     dispatch(clearNotifications());
  //     if (user.role === 'user') {
  //       dispatch(fetchRenterNotificationsAsync());
  //     } else if (user.role === 'landlord') {
  //       dispatch(fetchLandlordNotificationsAsync());
  //     }
  //   }
  // }, [dispatch, user]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
  console.log(user, 'user role');
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
            <IconButton color="inherit">
              <NotificationDropdown role={user?.role} />
            </IconButton>
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
              {/* {user?.role === 'landlord' && (
                <MenuItem onClick={handleClose} component={Link} to="/my-properties">
                  My Properties
                </MenuItem>
              )} */}
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
              {/* {user?.role === 'landlord' && (
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
              )} */}
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
