import React from 'react';
import { Carousel } from 'react-responsive-carousel'; // Import Carousel from react-responsive-carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Box, Typography } from '@mui/material'; // Import Material-UI components
import PropertySearch from './PropertySearch'; // Import your search component

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
        interval={3000} // Set interval to 3 seconds for debugging
        transitionTime={500} // Set transition time to 0.5 seconds for debugging
      >
        <div>
          <Box
            sx={{
              height: '100vh',
              backgroundImage:
                'url(https://via.placeholder.com/640x480.png/007777?text=dignissimos)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              //   backgroundColor: 'red', // Temporary background color for debugging
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
              //   backgroundColor: 'blue', // Temporary background color for debugging
            }}
          />
        </div>
        {/* Add more slides as needed */}
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay for better text visibility
        }}
      >
        <Typography variant="h2" component="h1">
          Welcome to RentEZ
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 3 }}>
          Your ultimate destination for finding rental properties.
        </Typography>
        <PropertySearch /> {/* Your search component */}
      </Box>
    </Box>
  );
}

export default Hero;
