import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { logout } from 'store/Auth/authSlice';
import { useDispatch } from 'react-redux';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user;

  useEffect(() => {
    user = secureLocalStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      className="header"
      sx={{ backgroundColor: '#2b3d4f' }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          className="title"
          to="/"
          sx={{ color: '#cdd0d8', textDecoration: 'none' }}
        >
          RentEZ Admin Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
            {user.username}
          </Typography>
        )}

        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={NavLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
