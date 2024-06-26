// // src/components/Header.jsx
// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// function Header() {
//   return (
//     <AppBar position="static" className="header">
//       <Toolbar>
//         <Typography variant="h6" className="title">
//           RentEZ
//         </Typography>
//         <Box sx={{ flexGrow: 1 }} />
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Button color="inherit">Home</Button>
//           <Button color="inherit">Rent</Button>
//           <Button color="inherit">Buy</Button>
//           <Button color="inherit">About</Button>
//         </Box>
//         <Box sx={{ flexGrow: 1 }} />
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <IconButton color="inherit">
//             <FavoriteIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton edge="end" color="inherit">
//             <AccountCircleIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of profile menu

  const navigate = useNavigate();

  // Function to handle profile icon click
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing profile menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing tokens, resetting state
    setIsLoggedIn(false);
    // Redirect to home page or login page after logout
    navigate('/');
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="title">
          RentEZ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/rent" color="inherit">
            Rent
          </Button>
          <Button component={Link} to="/buy" color="inherit">
            Buy
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn ? ( // Conditionally render based on authentication status
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit">
              <NotificationsIcon />
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button component={Link} to="/signin" color="inherit">
              Sign In
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
