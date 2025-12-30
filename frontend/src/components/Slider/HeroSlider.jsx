import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HeroSlider.css';
import api from '../../api/axios'; // Import your configured axios instance

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic slides from the database
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get('/sliders');
        setSlides(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slider data:", error);
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: slides.length > 1, // Only infinite if more than 1 slide
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: "center",
    centerMode: false, 
  };

  if (loading) return null; // Or a loading spinner

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {slides.length > 0 ? (
          slides.map((slide) => (
            <div className="slide" key={slide._id}>
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p style={{ 
                  color: '#fff', 
                  fontSize: '1.2rem', 
                  marginBottom: '20px', 
                  textShadow: '1px 1px 2px black' 
                }}>
                  {slide.description || slide.subtitle}
                </p>
                <button onClick={() => window.location.href = slide.link || '#'}>
                  {slide.button || 'Shop Now'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="slide">
            <div className="slide-content">
              <h2>Welcome to Our Store</h2>
              <p>Check back soon for new offers!</p>
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default HeroSlider;