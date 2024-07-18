import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import logo from 'assets/images/logo-auth.png';
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <Container sx={{ my: 11 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="overline" display="block" gutterBottom>
            {t(
              'We strive to make the process of buying, selling, and renting properties as easy and efficient as possible.'
            )}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {t('About us')}
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
            {t(
              'Our website offers a comprehensive platform for property listings, providing users with a seamless experience to find their desired homes and properties.'
            )}
          </Typography>
          <Button variant="contained" color="primary">
            {t('Learn more')}
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
