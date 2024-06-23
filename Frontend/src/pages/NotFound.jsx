import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function NotFound() {
  return (
    <Container
      style={{ textAlign: 'center', marginTop: '5rem', paddingTop: '5rem' }}
    >
      <Typography variant="h1" component="h1" style={{ fontSize: '2.5rem' }}>
        404 - Not Found
      </Typography>
      <Typography
        variant="body1"
        component="p"
        style={{ fontSize: '1.25rem', marginTop: '1rem' }}
      >
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        style={{ marginTop: '2rem' }}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFound;
