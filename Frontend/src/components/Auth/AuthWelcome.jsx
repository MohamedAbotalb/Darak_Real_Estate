import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from 'assets/images/logo.png';
import { useTranslation } from 'react-i18next';

export default function AuthWelcome() {
  const { t } = useTranslation();
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
        {t('Welcome to our website!')}
      </Typography>
      <img
        src={logo}
        alt="welcome"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
}
