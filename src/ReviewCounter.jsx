import React,{useEffect, useState} from 'react';
import styles from './ReviewCounter.module.css';
import { FaStar } from 'react-icons/fa';

const ReviewCounter = ({ reviewCount }) => {
    


  const renderBars = () => {
    const bars = [];
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
        starIcons.push(<FaStar key={i} className={styles.starIcon} />);
    }

    for (let i = 1; i <= 5; i++) {
      bars.push(
        <div key={i} className={styles.barContainer}>
          <p className={styles.label}>{i} Star</p>
          <div
            className={`${styles.bar} ${i == reviewCount ? styles.charged : ''}`}
          ></div>
  
        </div>
      );
    }
    return bars;
    
  };


  const SquareStars = () => {
    // State to track hover state of each star
    const [hoveredStar, setHoveredStar] = useState(null);
  
  
    const handleStarHover = (index) => {
      
      setHoveredStar(index === 0 ? null : index);
    };
  
    // Function to handle mouse leave from a star
    const handleMouseLeave = () => {
      setHoveredStar(null);
    };
  useEffect(() => {
    console.log(hoveredStar);
  })
    // Generate stars wrapped in square containers
    const stars = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`${styles.starSquare} ${
          index <= hoveredStar ? styles.hovered : ''
        }`}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleMouseLeave}
      >
        <FaStar />
      </div>
    ));
  
    return <div className={styles.starContainer}>{stars}</div>;
  };




  return (
    <div className={styles.container}>
      <div className={styles.bars}>{renderBars()}</div>

      <div className={styles.reviewCount}>
        <p>Overall Raating</p>
        {reviewCount}.00 </div>
        <div>
            <p>Review This Product</p>
            <SquareStars />
            <p>Adding a review will require a valid email for verification</p>
        </div>
    </div>
  );
};

export default ReviewCounter;
