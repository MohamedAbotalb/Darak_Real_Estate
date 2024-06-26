// // // src/components/Header.jsx
// // import React from 'react';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Box,
// // } from '@mui/material';
// // import HomeIcon from '@mui/icons-material/Home';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // function Header() {
// //   return (
// //     <AppBar position="static" className="header">
// //       <Toolbar>
// //         <Typography variant="h6" className="title">
// //           RentEZ
// //         </Typography>
// //         <Box sx={{ flexGrow: 1 }} />
// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <Button color="inherit">Home</Button>
// //           <Button color="inherit">Rent</Button>
// //           <Button color="inherit">Buy</Button>
// //           <Button color="inherit">About</Button>
// //         </Box>
// //         <Box sx={{ flexGrow: 1 }} />
// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <IconButton color="inherit">
// //             <FavoriteIcon />
// //           </IconButton>
// //           <IconButton color="inherit">
// //             <NotificationsIcon />
// //           </IconButton>
// //           <IconButton edge="end" color="inherit">
// //             <AccountCircleIcon />
// //           </IconButton>
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // }

// // export default Header;
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
//   const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of profile menu

//   const navigate = useNavigate();

//   // Function to handle profile icon click
//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // Function to handle closing profile menu
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Perform logout logic here, e.g., clearing tokens, resetting state
//     setIsLoggedIn(false);
//     // Redirect to home page or login page after logout
//     navigate('/');
//   };

//   return (
//     <AppBar position="static" className="header">
//       <Toolbar>
//         <Typography variant="h6" className="title">
//           RentEZ
//         </Typography>
//         <Box sx={{ flexGrow: 1 }} />
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Button component={Link} to="/" color="inherit">
//             Home
//           </Button>
//           <Button component={Link} to="/rent" color="inherit">
//             Rent
//           </Button>
//           <Button component={Link} to="/buy" color="inherit">
//             Buy
//           </Button>
//           <Button component={Link} to="/about" color="inherit">
//             About
//           </Button>
//         </Box>
//         <Box sx={{ flexGrow: 1 }} />
//         {isLoggedIn ? ( // Conditionally render based on authentication status
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton color="inherit">
//               <FavoriteIcon />
//             </IconButton>
//             <IconButton color="inherit">
//               <NotificationsIcon />
//             </IconButton>
//             <IconButton
//               edge="end"
//               color="inherit"
//               onClick={handleProfileClick}
//               aria-controls="profile-menu"
//               aria-haspopup="true"
//             >
//               <AccountCircleIcon />
//             </IconButton>
//             <Menu
//               id="profile-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleClose}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button component={Link} to="/signin" color="inherit">
//               Sign In
//             </Button>
//             <Button component={Link} to="/signup" color="inherit">
//               Sign Up
//             </Button>
//           </Box>
//         )}
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon from Material-UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    // Handle profile icon click
    // Implementation not shown for brevity
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true); // Open the drawer
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false); // Close the drawer
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="title">
          RentEZ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isSmallScreen ? (
          // Render MenuIcon for smaller screens
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        ) : (
          // Render regular navigation links for larger screens
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
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Additional icons and profile menu for logged-in users */}
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
              <ListItem button onClick={handleProfileClick}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Log Out" />
              </ListItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Sign in and sign up buttons */}
            <Button component={Link} to="/signin" color="inherit">
              Sign In
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
      {/* Responsive Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/rent" onClick={handleDrawerClose}>
            <ListItemText primary="Rent" />
          </ListItem>
          <ListItem button component={Link} to="/buy" onClick={handleDrawerClose}>
            <ListItemText primary="Buy" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={handleDrawerClose}>
            <ListItemText primary="About" />
          </ListItem>
          {isLoggedIn ? (
            <div>
              {/* Additional menu items for logged-in users */}
              <ListItem button onClick={handleProfileClick}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Log Out" />
              </ListItem>
            </div>
          ) : (
            <div>
              {/* Sign in and sign up links */}
              <ListItem button component={Link} to="/signin" onClick={handleDrawerClose}>
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button component={Link} to="/signup" onClick={handleDrawerClose}>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
