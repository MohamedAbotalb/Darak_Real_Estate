import React from 'react';
import PropertyListings from '../components/PropertyListings';

function HomePage() {
  return (
    <div>
      <PropertyListings type="rent" />
      <PropertyListings type="sell" />
    </div>
  );
}

export default HomePage;
