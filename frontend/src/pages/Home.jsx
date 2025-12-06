import React from 'react';
import HeroSlider from '../components/Slider/HeroSlider'; // Ensuring Slider is imported
import PopularProducts from '../components/PopularProducts/PopularProducts';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. Most Popular Cards Section */}
      <PopularProducts />

      {/* 3. Additional Sections (Optional) */}
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', marginTop: '40px' }}>
        <h3>Join the Community</h3>
        <p>Sign up for our newsletter to get the latest drops!</p>
      </div>
    </div>
  );
};

export default Home;