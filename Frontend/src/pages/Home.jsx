import React from 'react';
import { Box, Typography, Container   } from '@mui/material';
import Hero from 'components/Home/Hero';
import PropertyListings from 'components/Home/PropertyListings';
import CategoryFilter from 'components/Home/CategoryFilter';
import WhyChooseUs from 'components/Home/whyChooseUs';

function Home() {
  return (
    <Box className="home">
      <Hero />
      <Container >
        <CategoryFilter/>
        <PropertyListings type={'rent'}/>
        <WhyChooseUs/>
        <PropertyListings type={'sell'}/>
      </Container>
     
    </Box>
  );
}

export default Home;
