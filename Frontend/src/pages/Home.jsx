// src/pages/Home.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Hero from 'components/Home/Hero';
import PropertySearch from '../components/Home/PropertySearch';
import PropertyListings from '../components/Home/PropertyListings';
import About from '../components/Home/About';

function Home() {
  return (
    <Box className="home">
      <Hero />
      <PropertyListings type="rent" />
      <PropertyListings type="sell" />
      <About />
    </Box>
  );
}

export default Home;
