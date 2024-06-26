// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import PropertySearch from 'components/PropertySearch';
import PropertyListings from '../components/PropertyListings';
import About from '../components/About';
import Footer from '../components/Footer';
// import './home.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="hero-section">
        <div className="hero-content">
          <h1>RentEZ</h1>
          <p>
            Aliquip fugiat ipsum nostrud ex et eu incididunt quis minim dolore
            excepteur voluptate.
          </p>
          <PropertySearch />
        </div>
      </div>
      <PropertyListings type="rent" />
      <PropertyListings type="sell" />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
