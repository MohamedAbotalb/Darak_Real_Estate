import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyListings from './components/PropertyListings';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/properties/rent" />} />
      <Route path="/properties/rent" element={<PropertyListings type="rent" />} />
      <Route path="/properties/sell" element={<PropertyListings type="sell" />} />
      {/* <Route path="/wishlist" element={<Wishlist />} /> Wrapped Wishlist in a Route */}
    </Routes>
  );
}

export default App;
