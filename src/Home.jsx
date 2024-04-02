import React,{useEffect, useState} from 'react';
import Navbar from './Navbar';
import  { HomeCarousels1,HomeCarousels } from './HomeCarousels';
import Footer from './Footer';
import './Home.css'
import { Link } from 'react-router-dom';
import dogImage from './assets/carousel1.jpg';
import catImage from './assets/carousel2.jpg';
import birdImage from './assets/carousel3.jpg'
import dog1 from './assets/dog1.png'
import { useCart } from './CartContext.jsx'
import bird1 from './assets/bird1.jpg'
import cat1 from './assets/cat1.png'
import fish from './assets/fish.jpg'
import { useMyContext } from './DataContext';
const  Home = () => {
const { sharedData } = useMyContext();
const {addToCart,cartMenuOpen} = useCart();

const CyclingImage = () => { 
  const [startIndex, setStartIndex] = useState(0);
  
  const images = [
    
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_145/23-topdeals-clearance-dog',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/topdogcategories-2for5dogtoys',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog12',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog7',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog6',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog3',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog9',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog8',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog5',
     'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Dog4'
      
  ]
  const imagesPerPage = 7;
  const totalImages = 10
  const goToPreviousPage = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNextPage = () => {
    setStartIndex((prevIndex) => Math.min(images.length - imagesPerPage, prevIndex + 1));
  };
  useEffect(() => {
    console.log(`this is start index counter ${startIndex}`);
  }, [startIndex, startIndex, imagesPerPage, totalImages]);
  
  return (
    <div className="carousel-wrapper">
      <button onClick={goToPreviousPage}>&lt;</button>
 
      <div className="image-container" >
        {images.slice(startIndex, startIndex + imagesPerPage).map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className='carousel-image'  />
        ))}
      </div>
      <button onClick={goToNextPage}>&gt;</button>
    </div>
  );
};
  return (
    <div>
      <Navbar />
    
      <div className={`home-container ${cartMenuOpen ? 'overlay' : ''}`}>

    <HomeCarousels />


<div className='dealsby-pet'>
<p className='deals-text'>
  Deals by Pet
 </p>
<div className='pet-container'>
    <img src="https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-dog-562x562" alt="Dog" className="pet-circle dog" />
    <p>Dog Deals</p>
  </div>
  <div className='pet-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-cat-562x562' alt="Cat" className="pet-circle cat" />
    <Link to="/cat"> <p>Cat Deals</p>   </Link>
  </div>
  <div className='pet-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-bird-562x562' alt="Bird" className="pet-circle bird" />
    <p>Bird Deals</p>
  </div>

  <div className='pet-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-fish-562x562' alt="Fish" className="pet-circle fish" />
    <p>Fish Deals</p>
  </div>
  <div className='pet-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-small-pet-562x562' alt="Fish" className="pet-circle fish" />
    <p>Small Pet Deals</p>
  </div>
  <div className='pet-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_139/hp-shop-by-pet-type-reptile-562x562' alt="Fish" className="pet-circle fish" />
    <p>Reptile Deals</p>
  </div>
</div>

<div className='pet-essentials'>
<p className='discount-text'> 35% OFF YOUR FIRST REPEAT DELIVERY ORDER</p>

<div className='stick'>

</div>
</div>
   <div className='lowprice'>
  
    <div className='item-container'  >
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/edlp-feb24-offer-1' className='offer1' />
    <p className='text-container'>DOG TREATS & CHEWS <br></br>UNDER<br></br>10$</p>
    </div>
    <div className='item-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/edlp-mar24-offer-2' className='offer2' />
    <p className='text-container'>GROOMING SUPPLIES <br></br>UNDER<br></br>10$</p>
    </div>
    <div className='item-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/edlp-feb24-offer-3' className='offer3' />
    <p className='text-container'>SMALL PET TREATS <br></br>UNDER<br></br>10$</p>

    </div>
    <div className='item-container'>
    <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/edlp-feb24-offer-4' className='offer4' />
    <p className='text-container'>AQUARIUM DÉCOR<br></br>UNDER<br></br>10$</p>

    </div>
   
    </div>
 
  </div>

  <HomeCarousels1 />
 
<Footer />

    </div>
 
  );
}

export default Home;
