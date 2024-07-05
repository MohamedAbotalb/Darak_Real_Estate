import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import { logout, setCredentials } from 'store/Auth/authSlice';
import { fetchWishlist } from 'store/home/wishlistSlice';
import {
  fetchUserNotificationsAsync,
  fetchLandlordNotificationsAsync,
  clearNotifications,
} from 'store/Notifications/notificationsSlice';
import NotificationDropdown from 'components/Home/Notifications/NotificationDropdown';

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
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(secureLocalStorage.getItem('user'));
    if (storedUser) {
      dispatch(setCredentials(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      dispatch(fetchWishlist());
      dispatch(clearNotifications());
      if (user.role === 'user') {
        dispatch(fetchUserNotificationsAsync());
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

  // Function to determine if a link is active based on path and search params
  const isActiveLink = (path, searchParam) => {
    return location.pathname === path && location.search.includes(searchParam);
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
              component={NavLink}
              to="/"
              isActive={() => isActiveLink('/', '')}
              color="inherit"
              sx={{
                color: isActiveLink('/', '') ? '#60B2F0' : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/', '')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/properties?lt=rent"
              isActive={() => isActiveLink('/properties', 'lt=rent')}
              color="inherit"
              sx={{
                color: isActiveLink('/properties', 'lt=rent')
                  ? '#60B2F0'
                  : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/properties', 'lt=rent')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
              }}
            >
              Rent
            </Button>
            <Button
              component={NavLink}
              to="/properties?lt=buy"
              isActive={() => isActiveLink('/properties', 'lt=buy')}
              color="inherit"
              sx={{
                color: isActiveLink('/properties', 'lt=buy')
                  ? '#60B2F0'
                  : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/properties', 'lt=buy')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
              }}
            >
              Buy
            </Button>
            <Button
              component={NavLink}
              to="/about"
              isActive={() => isActiveLink('/about', '')}
              color="inherit"
              sx={{
                color: isActiveLink('/about', '') ? '#60B2F0' : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/about', '')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
              }}
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
              {user?.role === 'landlord' && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/myproperties"
                >
                  My Properties
                </MenuItem>
              )}
              {user?.role === 'user' && (
                <MenuItem onClick={handleClose} component={Link} to="/mytours">
                  My Tours
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
          <ListItem
            button
            component={NavLink}
            to="/"
            isActive={() => isActiveLink('/', '')}
            color="inherit"
            onClick={handleDrawerClose}
            sx={{
              color: isActiveLink('/', '') ? '#60B2F0' : '#cdd0d8',
              textTransform: 'none',
              backgroundColor: isActiveLink('/', '')
                ? '#34495E'
                : 'transparent',
              '&:hover': {
                backgroundColor: '#34495E',
              },
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/properties?lt=rent"
            isActive={() => isActiveLink('/properties', 'lt=rent')}
            color="inherit"
            onClick={handleDrawerClose}
            sx={{
              color: isActiveLink('/properties', 'lt=rent')
                ? '#60B2F0'
                : '#cdd0d8',
              textTransform: 'none',
              backgroundColor: isActiveLink('/properties', 'lt=rent')
                ? '#34495E'
                : 'transparent',
              '&:hover': {
                backgroundColor: '#34495E',
              },
            }}
          >
            <ListItemText primary="Rent" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/properties?lt=buy"
            isActive={() => isActiveLink('/properties', 'lt=buy')}
            color="inherit"
            onClick={handleDrawerClose}
            sx={{
              color: isActiveLink('/properties', 'lt=buy')
                ? '#60B2F0'
                : '#cdd0d8',
              textTransform: 'none',
              backgroundColor: isActiveLink('/properties', 'lt=buy')
                ? '#34495E'
                : 'transparent',
              '&:hover': {
                backgroundColor: '#34495E',
              },
            }}
          >
            <ListItemText primary="Buy" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/about"
            isActive={() => isActiveLink('/about', '')}
            color="inherit"
            onClick={handleDrawerClose}
            sx={{
              color: isActiveLink('/about', '') ? '#60B2F0' : '#cdd0d8',
              textTransform: 'none',
              backgroundColor: isActiveLink('/about', '')
                ? '#34495E'
                : 'transparent',
              '&:hover': {
                backgroundColor: '#34495E',
              },
            }}
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
                    : '/user-notifications'
                }
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <Badge badgeContent={notifications?.length} color="error">
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
