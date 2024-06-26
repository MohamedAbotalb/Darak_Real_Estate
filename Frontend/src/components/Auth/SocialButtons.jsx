// SocialButtons.js
import React from 'react';
import { Box, Button } from '@mui/material';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';

function SocialButtons() {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = '/api/auth/facebook';
  };

  return (
    <Box display="flex" justifyContent="space-between" mt={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          flex: 1,
          backgroundColor: '#DB4437',
          '&:hover': {
            backgroundColor: '#DB4437',
          },
          mr: 1,
        }}
      >
        Google
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FacebookIcon />}
        onClick={handleFacebookLogin}
        sx={{
          flex: 1,
          backgroundColor: '#3b5998',
          '&:hover': {
            backgroundColor: '#3b5998',
          },
          ml: 1,
        }}
      >
        Facebook
      </Button>
    </Box>
  );
}

export default SocialButtons;
