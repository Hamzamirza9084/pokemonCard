import React from 'react';
import HeroSlider from '../components/Slider/HeroSlider';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <div className="content-container">
        <h1>Welcome to the Shop</h1>
        <p>Best cards in town.</p>
      </div>
    </div>
  );
};

export default Home;