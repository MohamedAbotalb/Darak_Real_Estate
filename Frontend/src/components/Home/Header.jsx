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
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'store/Auth/authSlice';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
          component={Link}
          to="/"
          sx={{ color: '#cdd0d8', textDecoration: 'none' }}
        >
          RentEZ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isSmallScreen ? (
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        ) : (
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
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/wishlist">
              <FavoriteIcon />
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
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/register"
              color="inherit"
              sx={{ color: '#cdd0d8', textTransform: 'none' }}
            >
              Register
            </Button>
          </Box>
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
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItem>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleDrawerClose}
              >
                <ListItemText primary="Log In" />
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

// import React, { useState, useEffect } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
//   Badge,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from 'store/Auth/authSlice';

// function Header() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Optional: Handle any logic on user state change
//   }, [user]);

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <AppBar
//       position="static"
//       className="header"
//       sx={{ backgroundColor: '#2b3d4f' }}
//     >
//       <Toolbar>
//         <Typography
//           variant="h6"
//           className="title"
//           component={Link}
//           to="/"
//           sx={{ color: '#cdd0d8', textDecoration: 'none' }}
//         >
//           RentEZ
//         </Typography>
//         <Box sx={{ flexGrow: 1 }} />
//         {isSmallScreen ? (
//           <IconButton color="inherit" onClick={handleDrawerOpen}>
//             <MenuIcon />
//           </IconButton>
//         ) : (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button
//               component={Link}
//               to="/"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               Home
//             </Button>
//             <Button
//               component={Link}
//               to="/rent"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               Rent
//             </Button>
//             <Button
//               component={Link}
//               to="/buy"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               Buy
//             </Button>
//             <Button
//               component={Link}
//               to="/about"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               About
//             </Button>
//           </Box>
//         )}
//         <Box sx={{ flexGrow: 1 }} />
//         {user ? (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit" component={Link} to="/wishlist">
//               <FavoriteIcon />
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
//             <Button
//               component={Link}
//               to="/login"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               Log In
//             </Button>
//             <Button
//               component={Link}
//               to="/register"
//               color="inherit"
//               sx={{ color: '#cdd0d8', textTransform: 'none' }}
//             >
//               Register
//             </Button>
//           </Box>
//         )}
//       </Toolbar>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
//         <List>
//           <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem
//             button
//             component={Link}
//             to="/rent"
//             onClick={handleDrawerClose}
//           >
//             <ListItemText primary="Rent" />
//           </ListItem>
//           <ListItem
//             button
//             component={Link}
//             to="/buy"
//             onClick={handleDrawerClose}
//           >
//             <ListItemText primary="Buy" />
//           </ListItem>
//           <ListItem
//             button
//             component={Link}
//             to="/about"
//             onClick={handleDrawerClose}
//           >
//             <ListItemText primary="About" />
//           </ListItem>
//           {user ? (
//             <ListItem button onClick={handleLogout}>
//               <ListItemText primary="Log Out" />
//             </ListItem>
//           ) : (
//             <>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/login"
//                 onClick={handleDrawerClose}
//               >
//                 <ListItemText primary="Log In" />
//               </ListItem>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/register"
//                 onClick={handleDrawerClose}
//               >
//                 <ListItemText primary="Register" />
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </AppBar>
//   );
// }

// export default Header;
