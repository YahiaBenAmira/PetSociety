import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dogImage from './assets/carousel1.jpg';
import catImage from './assets/carousel2.jpg';
import birdImage from './assets/carousel3.jpg';
import './ItemCarousel.css'; // Your CSS file for carousel styling

const ItemCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 items at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home">
      <Slider {...settings}>
        <div>
          <img src={dogImage} alt="Dog" className="carousel-image" />
        </div>
        <div>
          <img src={catImage} alt="Cat" className="carousel-image" />
        </div>
    
        <div>
          <img src={birdImage} alt="Bird" className="carousel-image" />
          <p>Comment tu tappele ya zeby</p>
        </div>
        {/* Add more images inside Slider component as needed */}
      </Slider>
    </div>
  );
};

export default ItemCarousel;
