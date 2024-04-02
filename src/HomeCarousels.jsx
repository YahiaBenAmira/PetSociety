import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png'
import styles from './HomeCarousel.module.css';
import { useCart } from './CartContext.jsx'
const HomeCarousels1 = () => {
  const {addToCart,cartMenuOpen} = useCart();

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
  const images2 = [ 
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/23-topdeals-clearance-cat',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat5',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/topcatcategories-3for6cattoys',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat3',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat4',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat1',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat6',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat8',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat7',
    'https://assets.petco.com/petco/image/upload/f_auto,q_auto:best,dpr_2.0,w_160/Trending_DogandCat_Cat11'
  ]
  const settings = {
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 168, // Adjust breakpoints as needed
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 100, // Adjust breakpoints as needed
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // Add more settings as needed
  };

  return (
    <div>
 <Slider {...settings} className={`${styles.slickdiv} ${cartMenuOpen ? styles.overlay : ''}`}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index + 1}`} style={{ width: '150px', margin: 20, padding: 0, borderRadius: 7, }}/>
        </div>
      ))}
     
    </Slider>

        <Slider {...settings} className={`${styles.slickdiv} ${cartMenuOpen ? styles.overlay : ''}`}>
        {images2.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index + 1}`} style={{ width: '150px', margin: 20, padding: 0, borderRadius: 7, }}/>
          </div>
        ))}
       
      </Slider>
    </div>
   
  );
};

const CustomPrevArrow = (props) => (
  <button {...props} style={{ backgroundColor: 'transparent', color: 'black', fontSize: '24px', border: 'none' }}>
    &lt;
  </button>
);

const CustomNextArrow = (props) => (
  <button {...props} style={{ backgroundColor: 'transparent', color: 'black', fontSize: '24px', border: 'none' }}>
    &gt;
  </button>
);

const HomeCarousels = () => {
  return (
    <div className={styles.homecarousel}>
      <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover={true}>
        <div className={styles.carousel}>
          <p className={styles.textcarousel}>Free money niggers</p>
          <img src={image1} alt="Dog" className={styles.carouselimage} />
        </div>
        <div className={styles.carousel1}>
          <img src={image2} alt="Cat" className={styles.carouselimage1} />
        </div>
        <div>
          <img src={image3} alt="Cat" className={styles.carouselimage2} />
        </div>
       
      </Carousel>
    </div>
  );
};

export { HomeCarousels, HomeCarousels1 };
