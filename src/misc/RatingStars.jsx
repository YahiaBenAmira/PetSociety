import React from 'react';
import Rating from 'react-rating-stars-component';

const RatingStars = ({ value, handleChange }) => {
  return (
    <Rating
      count={5} // Number of stars
      size={27} // Size of stars
      value={value} // Current rating value
      onChange={handleChange} // Function to handle rating changes
      activeColor="#1F2D5A" // Color of active stars
      inactiveColor="#ddd" // Color of inactive stars
      edit={false} // Allow user to edit rating
    />
  );
};

export default RatingStars;
