// src/pages/Home.jsx
import React from 'react';
import { Box } from '@mui/material';
import Hero from 'components/Home/Hero';
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
