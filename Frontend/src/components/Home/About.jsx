import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

function AboutUs() {
  return (
    <Container sx={{ my: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="overline" display="block" gutterBottom>
            Dolore dolore voluptate aliqua ut mi
          </Typography>
          <Typography variant="h4" gutterBottom>
            About us
            <Box
              component="span"
              sx={{
                display: 'block',
                width: '50px',
                height: '4px',
                backgroundColor: 'primary.main',
                mt: 1,
                borderRadius: '2px',
              }}
            />
          </Typography>
          <Typography variant="body1" paragraph>
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad
            veniam cupidatat ullamco ullamco et. Aliqua tempor do consectetur
            reprehenderit Lorem aliqua commodo occaecat deserunt. Do eiusmod
            incididunt.
          </Typography>
          <Button variant="contained" color="primary">
            Learn more
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '25%',
                width: '50%',
                height: '100%',
                borderRadius: '0 50% 50% 0',
                backgroundColor: '#f0f4fa',
                zIndex: -1,
              }}
            />
            <Box
              component="img"
              src="https://via.placeholder.com/400"
              alt="About Us"
              sx={{
                width: '70%',
                height: '70%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
