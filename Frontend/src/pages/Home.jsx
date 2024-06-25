// src/pages/Home.jsx
import React from 'react';
import PropertyListings from '../components/PropertyListings';

function Home() {
  return (
    <div>
      <PropertyListings type="rent" />
      <PropertyListings type="sell" />
    </div>
  );
}

export default Home;
