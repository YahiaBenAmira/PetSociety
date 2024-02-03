import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import HomeCarousels from './HomeCarousels';
import Footer from './Footer'; // Import your HomeCarousels component
import './Home.css'
import dogImage from './assets/carousel1.jpg';
import catImage from './assets/carousel2.jpg';
import birdImage from './assets/carousel3.jpg'
import dog1 from './assets/dog1.png'
import bird1 from './assets/bird1.jpg'
import cat1 from './assets/cat1.png'
import fish from './assets/fish.jpg'
function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <HomeCarousels />
      </div>
      <div className='sign-in'>

      
      <p>Sign in for the best experience</p>
      <button>Sign in</button>
      </div>
      <div className='selling-products'>
        <p className='text-products'>Best Selling Products</p>
        <div className='selling-list'>
        <img src={dogImage} alt="Dog" className="listing-image" />
        <img src={catImage} alt="Dog" className="listing-image" />
        <img src={birdImage} alt="Dog" className="listing-image" />
        </div>
        
      </div>
      <div className='dealsby-pet'>
        <p className='deals-text'>Deals by Pet Type</p>
  <img src={dog1} alt="Dog" className="pet-circle dog" />
  <img src={cat1} alt="Cat" className="pet-circle cat" />
  <img src={bird1} alt="Bird" className="pet-circle bird" />
  <img src={fish} alt="Fish" className="pet-circle fish" />
</div>

<Footer />
    </div>
  );
}

export default Home;
