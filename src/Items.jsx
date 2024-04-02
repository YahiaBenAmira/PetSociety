import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import Footer from './Footer.jsx'
import OneItems from './OneItem.jsx';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import './Items.css'
import Menu from './Menu';
import Home from './Home';
import ItemCarousel from './ItemCarousel';
import { useMyContext } from './DataContext.jsx';

import RatingStars from './misc/RatingStars.jsx';
import { useNavigate } from 'react-router-dom';
function Items () { 
const [data,setData] = useState([])
const [category,setCategory] = useState({
  pets: [],
  price: [],
  foodform: [],
  rating: []
})
const [filteredData, setFilteredData] = useState(data);
const navigate = useNavigate();
const { sharedData } = useMyContext();

useEffect(() => {
  setData(sharedData);
  setFilteredData(sharedData); 
}, [sharedData]);




const handleanotherfilter = (e) => {
  if (!e) {
    console.log('Event object is not defined');
    return;
  }

  const { name, value, checked } = e.target;
  const lowerCaseName = name.toLowerCase(); // Convert the name to lowercase

  setCategory(category => {
    if (lowerCaseName === 'food form') {
      return {
        ...category,
        foodform: checked ? [value] : [],
      };
    } else {
      return {
        ...category,
        [lowerCaseName]: checked ? [...category[lowerCaseName], value] : category[lowerCaseName].filter(item => item !== value),
      };
    }
  });
};
useEffect(() => {
  console.log('Category after updating:', category);

  // Filtering logic
  const filtering = data.filter((item) => {
    const checkPriceRange = (itemPrice, priceRanges) => {
      if (!priceRanges.length) return true; // Include the item if no price ranges are selected
    
      const numericPrice = parseFloat(itemPrice.replace('$', ''));
      return priceRanges.some(range => {
        const [min, max] = range.split(' to ');
        return numericPrice >= parseFloat(min) && numericPrice <= parseFloat(max);
      });
    };
    
    
  
    // Check if any checkboxes are checked for each category
    const anyPetsChecked = category.pets.length > 0;
    const anyFoodFormChecked = category.foodform.length > 0;
    const anyRatingChecked = category.rating.length > 0;
    const anyPriceChecked = !!category.price;
  
    // Apply filters based on checkbox status
    const petFilter = !anyPetsChecked || category.pets.includes(item.category);
    const foodFormFilter = !anyFoodFormChecked || category.foodform.includes(item.foodcategory);
    const priceFilter = !anyPriceChecked || checkPriceRange(item.itemPrice, category.price);
    const ratingFilter = !anyRatingChecked || category.rating.includes(item.productRating);
    
    // Return true to include the item if no filters are applied
    return !anyPetsChecked && !anyFoodFormChecked && !anyRatingChecked && !anyPriceChecked ||
      (petFilter && foodFormFilter && ratingFilter && priceFilter);
  });
  
  
  console.log('Filtered data:', filtering);
  setFilteredData(filtering);
  }, [category, data]);
  // Execute the effect whenever category or data changes


const getId = (id) => { 
 navigate(`/${id}/item`)
}


  return (

    <div className='main-container'>
<div className='navbar-section'>
<Navbar />
</div>
<div className='data-section'>
<div className='filter-menu-section'>
<Menu  data={data} handleanotherfilter={handleanotherfilter} />
</div>
<div className='data-rendered-section' >
{filteredData.length > 0 ? (
  filteredData.map((filteredItem) => (
    <div key={filteredItem.items_id} className='image-item' onClick={() => getId(filteredItem.items_id)} >
      {filteredItem.imageData && (
        <div className='image-wrapper'>
          <img src={`data:image/jpeg;base64,${filteredItem.imageData}`} alt='Item' className='item-image' />
        </div>
      )}
      <div className='item-details' >
        <p className='item-name'>{filteredItem.itemName}</p>
        <p className='item-price'>{filteredItem.itemPrice}</p>
        <RatingStars value={filteredItem.productRating} />
       
      </div>
    </div>
  ))
) : (
  <p>No item found</p>
)}
</div>

</div>

<Footer />



</div>
  )
  
          }

export default Items