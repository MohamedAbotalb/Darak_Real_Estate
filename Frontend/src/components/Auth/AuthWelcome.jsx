import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from 'assets/images/logo.png';

export default function AuthWelcome() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space"
      height="100%"
      marginTop="30px"
    >
      <Typography variant="h4" sx={{ mb: 8 }} gutterBottom>
        Welcome to our website!
      </Typography>
      <img
        src={logo}
        alt="welcome"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
}
