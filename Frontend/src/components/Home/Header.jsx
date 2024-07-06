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

  const isActiveLink = (path, searchParam) => {
    return location.pathname === path && location.search.includes(searchParam);
  };

  return (
    <AppBar
      position="fixed"
      // className="header"
      sx={{ backgroundColor: '#2C3E50' }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          className="title"
          component={Link}
          to="/"
          sx={{ color: '#cdd0d8', textDecoration: 'none', marginRight: 3 }}
        >
          RentEZ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!isSmallScreen && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {' '}
            <Button
              component={NavLink}
              to="/"
              isActive={() => isActiveLink('/', '')}
              color="inherit"
              sx={{
                fontSize: '1.1rem',
                color: isActiveLink('/', '') ? '#60B2F0' : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/', '')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
                margin: '0 10px',
              }}
            >
              Home
            </Button>
            {user?.role !== 'landlord' ? (
              <>
                <Button
                  component={NavLink}
                  to="/properties?lt=rent"
                  isActive={() => isActiveLink('/properties', 'lt=rent')}
                  color="inherit"
                  sx={{
                    fontSize: '1.1rem',
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
                    margin: '0 10px',
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
                    fontSize: '1.1rem',
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
                    margin: '0 10px',
                  }}
                >
                  Buy
                </Button>
              </>
            ) : (
              <Button
                component={NavLink}
                to="/myproperties"
                isActive={() => isActiveLink('/myproperties', '')}
                color="inherit"
                sx={{
                  fontSize: '1.1rem',
                  color: isActiveLink('/myproperties', '')
                    ? '#60B2F0'
                    : '#cdd0d8',
                  textTransform: 'none',
                  backgroundColor: isActiveLink('/myproperties', '')
                    ? '#34495E'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: '#34495E',
                  },
                  margin: '0 10px',
                }}
              >
                My Properties
              </Button>
            )}
            <Button
              component={NavLink}
              to="/about"
              isActive={() => isActiveLink('/about', '')}
              color="inherit"
              sx={{
                fontSize: '1.1rem',
                color: isActiveLink('/about', '') ? '#60B2F0' : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/about', '')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
                margin: '0 10px',
              }}
            >
              About
            </Button>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn && !isSmallScreen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {' '}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {' '}
              <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{
                  color: '#cdd0d8',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  color: '#cdd0d8',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
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
              fontSize: '1.1rem',
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
          {user?.role !== 'landlord' ? (
            <>
              <ListItem
                button
                component={NavLink}
                to="/properties?lt=rent"
                isActive={() => isActiveLink('/properties', 'lt=rent')}
                color="inherit"
                onClick={handleDrawerClose}
                sx={{
                  fontSize: '1.1rem',
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
                  fontSize: '1.1rem',
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
            </>
          ) : (
            <ListItem
              button
              component={NavLink}
              to="/myproperties"
              isActive={() => isActiveLink('/myproperties', '')}
              color="inherit"
              onClick={handleDrawerClose}
              sx={{
                fontSize: '1.1rem',
                color: isActiveLink('/myproperties', '')
                  ? '#60B2F0'
                  : '#cdd0d8',
                textTransform: 'none',
                backgroundColor: isActiveLink('/myproperties', '')
                  ? '#34495E'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: '#34495E',
                },
              }}
            >
              <ListItemText primary="My Properties" />
            </ListItem>
          )}
          <ListItem
            button
            component={NavLink}
            to="/about"
            isActive={() => isActiveLink('/about', '')}
            color="inherit"
            onClick={handleDrawerClose}
            sx={{
              fontSize: '1.1rem',
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
                sx={{ fontSize: '1.1rem' }}
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
                sx={{ fontSize: '1.1rem' }}
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
                sx={{ fontSize: '1.1rem' }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={handleLogout}
                sx={{ fontSize: '1.1rem' }}
              >
                {' '}
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
                sx={{ fontSize: '1.1rem' }}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={handleDrawerClose}
                sx={{ fontSize: '1.1rem' }}
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
