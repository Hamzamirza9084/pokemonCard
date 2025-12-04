import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HeroSlider.css';

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        <div className="slide">
          {/* Use a high-quality placeholder or local image */}
          <img src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=2000&auto=format&fit=crop" alt="Hero 1" />
          <div className="slide-content">
            <h2>Legendary Collections</h2>
            <button>Shop Now</button>
          </div>
        </div>
        <div className="slide">
          <img src="https://images.unsplash.com/photo-1635313203152-329622d56c4e?q=80&w=2000&auto=format&fit=crop" alt="Hero 2" />
        </div>
      </Slider>
    </div>
  );
};

export default HeroSlider;