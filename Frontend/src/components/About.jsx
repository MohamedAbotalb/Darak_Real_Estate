import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import logo from 'assets/images/logo-auth.png';

function AboutUs() {
  return (
    <Container sx={{ my: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Content */}
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

        {/* Right Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              height: '70%',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="About Us"
              sx={{
                maxWidth: '60%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 2,
                marginBottom: { xs: '20px', md: 0 }, // Add margin bottom only on small screens
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
