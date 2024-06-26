import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            About us
          </Typography>
          <Typography variant="body1" paragraph>
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ullamco et.
            Aliqua tempor do consectetur reprehenderit Lorem aliqua commodo occaecat deserunt. Do eiusmod incididunt.
          </Typography>
          <Button variant="contained" color="primary">
            Learn more
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://via.placeholder.com/400" // Replace with the actual image source
            alt="About Us"
            sx={{ width: '100%', borderRadius: 2 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
