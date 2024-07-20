import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import {
  AppBar,
  Toolbar,
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
import { FavoriteBorder } from '@mui/icons-material';
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
import LanguageSelector from 'components/LanguageSelector';
import { useTranslation } from 'react-i18next';

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
  const AdminImage = 'logo.png';
  const { t } = useTranslation();
  const underlineAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;
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
    <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 3,
            textDecoration: 'none',
            width: '100px',
          }}
        >
          <img
            src={AdminImage}
            alt="Darak"
            style={{
              height: 'auto',
              maxHeight: '50px',
              maxWidth: '100%',
            }}
          />
        </Box>

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
                color: '#000',
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                  '&::after': {
                    width: '100%',
                  },
                },
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: isActiveLink('/', '') ? '100%' : '0',
                  height: '2px',
                  backgroundColor: '#ed2128',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  transition: 'width 0.3s ease-in-out',
                  animation: isActiveLink('/', '')
                    ? `${underlineAnimation} 0.3s forwards`
                    : 'none',
                },
                margin: '0 10px',
              }}
            >
              {t('Home')}
            </Button>
            <>
              <Button
                component={NavLink}
                to="/properties?lt=rent"
                isActive={() => isActiveLink('/properties', 'lt=rent')}
                color="inherit"
                sx={{
                  fontSize: '1.1rem',
                  color: '#000',
                  textTransform: 'none',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  '&:focus': {
                    backgroundColor: 'transparent',
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: isActiveLink('/properties', 'lt=rent')
                      ? '100%'
                      : '0',
                    height: '2px',
                    backgroundColor: '#ed2128',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transition: 'width 0.3s ease-in-out',
                    animation: isActiveLink('/properties', 'lt=rent')
                      ? `${underlineAnimation} 0.3s forwards`
                      : 'none',
                  },
                  margin: '0 10px',
                }}
              >
                {t('Rent')}
              </Button>
              <Button
                component={NavLink}
                to="/properties?lt=buy"
                isActive={() => isActiveLink('/properties', 'lt=buy')}
                color="inherit"
                sx={{
                  fontSize: '1.1rem',
                  color: '#000',
                  textTransform: 'none',
                  backgroundColor: 'transparent',

                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  '&:focus': {
                    backgroundColor: 'transparent',
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: isActiveLink('/properties', 'lt=buy') ? '100%' : '0',
                    height: '2px',
                    backgroundColor: '#ed2128',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transition: 'width 0.3s ease-in-out',
                    animation: isActiveLink('/properties', 'lt=buy')
                      ? `${underlineAnimation} 0.3s forwards`
                      : 'none',
                  },
                  margin: '0 10px',
                }}
              >
                {t('Buy')}
              </Button>
              {user?.role === 'landlord' && (
                <Button
                  component={NavLink}
                  to="/myproperties"
                  isActive={() => isActiveLink('/myproperties')}
                  color="inherit"
                  sx={{
                    fontSize: '1.1rem',
                    color: '#000',
                    textTransform: 'none',
                    backgroundColor: 'transparent',

                    '&:hover': {
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                    },
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: isActiveLink('/myproperties') ? '100%' : '0',
                      height: '2px',
                      backgroundColor: '#ed2128',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      transition: 'width 0.3s ease-in-out',
                      animation: isActiveLink('/myproperties')
                        ? `${underlineAnimation} 0.3s forwards`
                        : 'none',
                    },
                    margin: '0 10px',
                  }}
                >
                  {t('My Properties')}
                </Button>
              )}
              {user?.role === 'user' && (
                <Button
                  component={NavLink}
                  to="/mytours"
                  isActive={() => isActiveLink('/mytours')}
                  color="inherit"
                  sx={{
                    fontSize: '1.1rem',
                    color: '#000',
                    textTransform: 'none',
                    backgroundColor: 'transparent',

                    '&:hover': {
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                    },
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: isActiveLink('/mytours') ? '100%' : '0',
                      height: '2px',
                      backgroundColor: '#ed2128',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      transition: 'width 0.3s ease-in-out',
                      animation: isActiveLink('/mytours')
                        ? `${underlineAnimation} 0.3s forwards`
                        : 'none',
                    },
                    margin: '0 10px',
                  }}
                >
                  {t('My Tours')}
                </Button>
              )}
            </>
            <Button
              component={NavLink}
              to="/about"
              isActive={() => isActiveLink('/about', '')}
              color="inherit"
              sx={{
                fontSize: '1.1rem',
                color: '#000',
                textTransform: 'none',

                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                  '&::after': {
                    width: '100%',
                  },
                },
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: isActiveLink('/about', '') ? '100%' : '0',
                  height: '2px',
                  backgroundColor: '#ed2128',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  transition: 'width 0.3s ease-in-out',
                  animation: isActiveLink('/about', '')
                    ? `${underlineAnimation} 0.3s forwards`
                    : 'none',
                },
                margin: '0 10px',
              }}
            >
              {t('About')}
            </Button>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        
        <LanguageSelector  />
        {isLoggedIn && !isSmallScreen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {' '}
            
              <NotificationDropdown role={user?.role} />
            
            <IconButton color="inherit" component={Link} to="/wishlist">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteBorder sx={{ color: '#000' }} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileClick}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <AccountCircleIcon sx={{ color: '#ccc8c8' }} />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                {t('Profile')}
              </MenuItem>
              <MenuItem onClick={handleLogout}>{t('Logout')}</MenuItem>
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
                  color: '#000',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                                      borderRadius:'12px',
                    padding: '5px 10px',
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#ed2128',
                    borderRadius:'12px',
                    padding: '5px 10px'
                  },
                }}
              >
                {t('Register')}
              </Button>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  color: '#000',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  borderRadius:'12px',
                  padding: '5px 10px',
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#ed2128',
                    borderRadius:'12px',
                    padding: '5px 10px'
                  },
                }}
              >
                {t('Log in')}
              </Button>
            </Box>
          )
        )}
        {isSmallScreen && (
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon sx={{ color: '#000' }} />
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
              color: '#ed2128',
              textTransform: 'none',

              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
                '&::after': {
                  width: '80%',
                },
              },
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: isActiveLink('/about', '') ? '100%' : '0',
                height: '2px',
                backgroundColor: '#ed2128',
                position: 'absolute',
                bottom: 0,
                left: 0,
                transition: 'width 0.3s ease-in-out',
                animation: isActiveLink('/about', '')
                  ? `${underlineAnimation} 0.3s forwards`
                  : 'none',
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
                  color: '#000',
                  textTransform: 'none',

                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: isActiveLink('/about', '') ? '100%' : '0',
                    height: '2px',
                    backgroundColor: '#ed2128',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transition: 'width 0.3s ease-in-out',
                    animation: isActiveLink('/about', '')
                      ? `${underlineAnimation} 0.3s forwards`
                      : 'none',
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
                  color: '#000',
                  textTransform: 'none',

                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: isActiveLink('/about', '') ? '100%' : '0',
                    height: '2px',
                    backgroundColor: '#ed2128',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transition: 'width 0.3s ease-in-out',
                    animation: isActiveLink('/about', '')
                      ? `${underlineAnimation} 0.3s forwards`
                      : 'none',
                  },
                }}
              >
                <ListItemText primary={t('Buy')} />
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
                color: '#000',
                textTransform: 'none',

                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                  '&::after': {
                    width: '80%',
                  },
                },
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: isActiveLink('/about', '') ? '100%' : '0',
                  height: '2px',
                  backgroundColor: '#ed2128',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  transition: 'width 0.3s ease-in-out',
                  animation: isActiveLink('/about', '')
                    ? `${underlineAnimation} 0.3s forwards`
                    : 'none',
                },
              }}
            >
              <ListItemText primary={t('My Properties')} />
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
              color: '#000',
              textTransform: 'none',

              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
                '&::after': {
                  width: '80%',
                },
              },
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: isActiveLink('/about', '') ? '100%' : '0',
                height: '2px',
                backgroundColor: '#ed2128',
                position: 'absolute',
                bottom: 0,
                left: 0,
                transition: 'width 0.3s ease-in-out',
                animation: isActiveLink('/about', '')
                  ? `${underlineAnimation} 0.3s forwards`
                  : 'none',
              },
            }}
          >
            <ListItemText primary={t('About')} />
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
                <ListItemText primary={t('Profile')} />
              </ListItem>
              <ListItem
                button
                onClick={handleLogout}
                sx={{ fontSize: '1.1rem' }}
              >
                {' '}
                <ListItemText primary={t('Logout')} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleDrawerClose}
                sx={{
                  fontSize: '1.1rem',
                  '&:hover': {
                    padding:'15px',
                    color: '#000',
                    backgroundColor: '#ed2128',
                  },
                }}
              >
                <ListItemText primary={t('Log in')} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={handleDrawerClose}
                sx={{
                  fontSize: '1.1rem',
                  '&:hover': {
                    color: '#000',
                    backgroundColor: '#ed2128',
                  },
                }}
              >
                <ListItemText primary={t('Register')} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
