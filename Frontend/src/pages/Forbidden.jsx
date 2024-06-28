import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ForbiddenPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        403
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Forbidden
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go to Home
      </Button>
    </Box>
  );
}

export default ForbiddenPage;
