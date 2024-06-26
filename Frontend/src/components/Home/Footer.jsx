// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';

function Footer() {
  return (
    <Box className="footer">
      <Typography variant="h6" gutterBottom>
        Real Estate
      </Typography>
      <Box className="footer-links">
        <IconButton color="inherit" href="#">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" href="#">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit" href="#">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" href="#">
          <InstagramIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" gutterBottom>
        Register now to get updates on promotions.
      </Typography>
      <Box className="subscription">
        <TextField
          label="Enter Email Address"
          variant="outlined"
          size="small"
          className="subscription-input"
        />
        <Button
          variant="contained"
          color="primary"
          className="subscribe-button"
        >
          Subscribe
        </Button>
      </Box>
      <Typography variant="body2" className="footer-note">
        All Rights Reserved © 2024 Real Estate
      </Typography>
    </Box>
  );
}

export default Footer;
