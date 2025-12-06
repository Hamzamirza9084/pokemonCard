import React from 'react';
import HeroSlider from '../components/Slider/HeroSlider'; 
// 1. Import the new banner component
import CategoryBanner from '../components/CategoryBanner/CategoryBanner'; 
import PopularProducts from '../components/PopularProducts/PopularProducts';
import NewArrivals from '../components/NewArrivals/NewArrivals';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. Category Banners (Booster/Box/Blister) - ADDED HERE */}
      <CategoryBanner />

      {/* 3. New Arrivals Section */}
      <NewArrivals />

      {/* 4. Most Popular Cards Section */}
      <PopularProducts />

      {/* 5. Community Section */}
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', marginTop: '40px' }}>
        <h3>Join the Community</h3>
        <p>Sign up for our newsletter to get the latest drops!</p>
      </div>
    </div>
  );
};

export default Home;