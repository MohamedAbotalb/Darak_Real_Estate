// src/components/Footer.jsx
import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

function Footer() {
  return (
    <div className="footer">
      <Typography variant="h6" gutterBottom>
        Real Estate
      </Typography>
      <Typography variant="body2" paragraph>
        Real estate can be bought, sold, leased, or rented, and can be a
        valuable investment opportunity. The value of real estate can be...
      </Typography>
      <div className="footer-links">
        <Button>Facebook</Button>
        <Button>Twitter</Button>
        <Button>LinkedIn</Button>
        <Button>Instagram</Button>
      </div>
      <div className="subscription">
        <Typography variant="body1">
          Register now to get updates on promotions.
        </Typography>
        <TextField label="Enter Email Address" variant="outlined" />
        <Button variant="contained" color="primary">
          Subscribe
        </Button>
      </div>
      <Typography variant="caption" display="block" gutterBottom>
        All Rights Reserved © 2024 Real Estate
      </Typography>
    </div>
  );
}

export default Footer;
