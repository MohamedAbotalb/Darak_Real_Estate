import React from 'react';
import { Box } from '@mui/material';
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
      <img src={logo} alt="welcome" style={{ width: '90%', height: 'auto' }} />
    </Box>
  );
}
