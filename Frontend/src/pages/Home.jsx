import React from 'react';
import { Box } from '@mui/material';
import Hero from 'components/Home/Hero';
import PropertyListings from 'components/Home/PropertyListings';

function Home() {
  return (
    <Box className="home">
      <Hero />
      <PropertyListings type="rent" />
      <PropertyListings type="buy" />
    </Box>
  );
}

export default Home;
