import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Typography } from '@mui/material';
import PropertySearch from 'components/Home/PropertySearch';

function Hero() {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={3000}
        transitionTime={500}
      >
        <div>
          <Box
            sx={{
              height: '100vh',
              backgroundImage:
                'url(https://via.placeholder.com/640x480.png/007777?text=dignissimos)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              height: '100vh',
              backgroundImage:
                'url(https://via.placeholder.com/640x480.png/007777?text=dignissimos)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </Carousel>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant="h2" component="h1">
          Welcome to RentEZ
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 3 }}>
          Your ultimate destination for finding rental properties.
        </Typography>
        <PropertySearch />
      </Box>
    </Box>
  );
}

export default Hero;
