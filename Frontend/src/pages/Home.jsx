import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Hero from 'components/Home/Hero';
import PropertyListings from 'components/Home/PropertyListings';
import CategoryFilter from 'components/Home/CategoryFilter';
import WhyChooseUs from 'components/Home/whyChooseUs';

function Home() {
  return (
    <Box className="home" sx={{backgroundColor: '#fff'}}>
      <Hero />
      <Container>
        <CategoryFilter />
      
        
        <PropertyListings type={'rent'} />
        
        <PropertyListings type={'sell'} />

       
      </Container>
      <Box sx={{backgroundColor: '#f7f7f7', mt:5}}>
        <Container >
          <WhyChooseUs />
        </Container>
      </Box>
       
    </Box>
  );
}

export default Home;
