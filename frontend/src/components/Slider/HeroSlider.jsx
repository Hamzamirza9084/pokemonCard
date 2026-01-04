import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HeroSlider.css';
import img1 from'../../../public/Images/Packs.jpeg'
import img2 from'../../../public/Images/Boxes.jpeg'
import img3 from'../../../public/Images/img3.png'
import img4 from'../../../public/Images/Singles.jpeg'
import img5 from'../../../public/Images/img5.png'

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,

    className: "center",
    centerMode: false, 
  };

  const slides = [
    {
      id: 1,
      // "Three pokemon balls sitting on top of a table"
      image: img1, 
      title: "Catch 'Em All",
      subtitle: "Shop our premium range of Pokéballs and tins",
      button: "Shop Gear"
    },
    {
      id: 2,
      // "Brown wooden framed photos on brown wooden table" (Display/Collection)
      image: img2,
      title: "Showcase Your Rares",
      subtitle: "Elegant frames and displays for your best pulls",
      button: "View Displays"
    },
    {
      id: 3,
      // "A person holding three pokemon cards in their hand"
      image: img3,
      title: "Booster Packs",
      subtitle: "Chase the latest hits from new expansions",
      button: "Buy Packs"
    },
    {
      id: 4,
      // "A group of cards" (Deck building)
      image: img4,
      title: "Build Your Deck",
      subtitle: "Singles and sets for competitive play",
      button: "Shop Singles"
    },
    {
      id: 5,
      // "Red and white ladybug toy" (Merch/Toys - assuming this fits the vibe)
      image: img5,
      title: "Plushies & Toys",
      subtitle: "Official merchandise for every fan",
      button: "View Toys"
    }
  ];

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div className="slide" key={slide.id}>
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', textShadow: '1px 1px 2px black' }}>
                {slide.subtitle}
              </p>
              <button>{slide.button}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;