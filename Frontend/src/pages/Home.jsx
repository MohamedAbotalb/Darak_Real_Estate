// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Home/Header';
import PropertySearch from '../components/Home/PropertySearch';
import PropertyListings from '../components/Home/PropertyListings';
import About from '../components/Home/About';
import Footer from '../components/Home/Footer';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled(Box)({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh', // Adjust the height as needed
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff', // Text color
  textAlign: 'center',
  padding: '2rem', // Adjust padding as needed
  backgroundColor: '#333', // Background color or image can be added here
});

const Home = () => {
  return (
    <Box className="home">
      <Header />
      <HeroSection>
        <Box>
          <Typography variant="h2" component="h1">
            RentEZ
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 4 }}>
            Aliquip fugiat ipsum nostrud ex et eu incididunt quis minim dolore
            excepteur voluptate.
          </Typography>
          <PropertySearch />
        </Box>
      </HeroSection>
      <PropertyListings type="rent" />
      <PropertyListings type="sell" />
      <About />
      <Footer />
    </Box>
  );
}

export default Home;
