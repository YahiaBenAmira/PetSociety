import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import dogImage from './assets/carousel1.jpg';
import catImage from './assets/carousel2.jpg';
import birdImage from './assets/carousel3.jpg'
import './HomeCarousels.css'; // Your CSS file for home carousel styling

const HomeCarousels = () => {
  return (
    <div className="home">
      <h1>Welcome to the Pet Society</h1>
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img src={dogImage} alt="Dog" className="carousel-image" />
        </div>
        <div>
          <img src={catImage} alt="Cat" className="carousel-image" />
        </div>
        <div>
          <img src={birdImage} alt="Cat" className="carousel-image" />
        </div>
        {/* Add more images inside Carousel div as needed */}
      </Carousel>
    </div>
  );
};

export default HomeCarousels;
