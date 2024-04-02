import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Divselector from './misc/Divselector.jsx'
import styles from './PetDetails.module.css'
import Navbar from './Navbar.jsx'
const PetDetails = () => {
const [onepetdata,setonepetData] = useState('')
const [filterdData,setFilterdData] = useState(onepetdata)
const [showFilterMenu, setShowFilterMenu] = useState(false);
const [filterValue,setFilterValue] = useState({
  brand: '',

  price: '',
  productrating: '',
  foodcategory: '',
  flavor: ''
})

const [priceDiv,setPriceDiv] = useState(false)
const [brandDiv,setBrandDiv] = useState(false)
const [ratingDiv,setRatingDiv] = useState(false)
const [foodcategoryDiv,setFoodCategoryDiv] = useState(false)
const [flavorDiv,setFlavorDiv] = useState(false)
const filterMenuRef = useRef(null);
const [pet,setPet] = useState('')
console.log('this is the pet state',pet);
const { petType } = useParams();
const urlEndpoint = `http://localhost:8002/api/items/petitems/${petType}`



const handleButtonClick = (actionName) => {
  switch (actionName) {
    case 'filter-button':
      setShowFilterMenu(!showFilterMenu);
      break;
    case 'displayDiv-price':
      setPriceDiv(!priceDiv);
      break;
    case 'displayDiv-brand':
      setBrandDiv(!brandDiv);
      break;
    case 'displayDiv-rating':
      setRatingDiv(!ratingDiv);
      break;
    case 'displayDiv-foodcategory':
      setFoodCategoryDiv(!foodcategoryDiv);
      break;
    case 'displayDiv-flavor':
      setFlavorDiv(!flavorDiv);
      break;
    default:
      break;
  }
};



useEffect(() => {
  console.log('this is state for filtermenu',showFilterMenu);
  console.log(onepetdata);
  console.log(filterValue);
})


const fetchData = async () => {
  try {
    const response = await axios.get(urlEndpoint);
    if (response.status === 200) {
      setonepetData(response.data.data);
      setPet(petType)
    } else {
      console.log('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleFilterValue = (e) => { 
  if(!e) {
    console.log('Event object is not defined');
    return
  }
  const {name,value,checked} = e.target
  
  const lowerCaseName = name.toLowerCase();
  setFilterValue({
    ...filterValue,
    [lowerCaseName]: checked ? value : '',
  });
 
};

useEffect(() => {
  const handleOutsideClick = (event) => {
    if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
      setShowFilterMenu(false); 
    }
  };
  document.addEventListener('mousedown', handleOutsideClick);
  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);

useEffect(() => {
  if (onepetdata) { 
    const filtering = onepetdata.filter((item) => {
      const checkPriceRange = (itemPrice, priceRange) => {
        if (!priceRange) return true;
        const [min, max] = priceRange.includes('-') ? priceRange.split('-') : [priceRange, priceRange];
        if (itemPrice && typeof itemPrice === 'string' && itemPrice.startsWith('$')) {
          const numericPrice = parseFloat(itemPrice.replace('$', ''));
          const numericMin = parseFloat(min.replace('$', ''));
          const numericMax = parseFloat(max.replace('$', ''));
          return numericPrice >= numericMin && numericPrice <= numericMax;
        }
        return false;
      };

      const checkRatingRange = (productRating, ratingRange) => {

        if (!ratingRange) return true;

        const numericRating = parseFloat(productRating);
        console.log('this is numericRating', numericRating);

        const [min, max] = ratingRange.split('-').map(value => parseFloat(value));

        return numericRating >= min && numericRating <= max;
    };
      

      const brandFilter = !filterValue.brand || item.brand === filterValue.brand;
      const foodCategoryFilter = !filterValue.foodcategory || item.foodcategory === filterValue.foodcategory;
      const priceFilter = !filterValue.price || checkPriceRange(item.itemPrice, filterValue.price);
      const flavorFilter = !filterValue.flavor || item.flavor === filterValue.flavor;
      const ratingFilter = !filterValue.productrating || checkRatingRange(item.productRating, filterValue.productrating);
      console.log(ratingFilter);
      console.log('filterValue productrating',filterValue.productrating);
      return brandFilter && foodCategoryFilter && priceFilter && flavorFilter && ratingFilter;
    });
  
    setFilterdData(filtering);
  }
}, [filterValue, onepetdata]);





let RenderEachPet
switch (pet) {
  case 'cat':
    console.log('this is case for pet cat');
  RenderEachPet = (
    <div className={styles.mainContainer}>
      <div>
      <img src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1580213-Nov22_CAT-BNR1_Cat-Food-Treats_DT" className={styles.catFoodTreats} />
      <p className={styles.catFoodTreatsText}>Shop Cat Food & Treats</p>
      </div>
      
<div className={styles.itemContainers}>
      

    <div className={styles.secondItemContainer}>
      <img src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2192011-Feb24_PCS2_Sitewide_DT" className={styles.petImage} />
      <p className={styles.textUnderImage}>
        EXTRA 25% OFF <br></br>select PetSmart exclusive items online with code: SAVE25<br></br> thru 2/19, see terms
      </p>
    </div>
    <div className={styles.secondItemContainer}>
      <img src="https://s7d2.scene7.com/is/image/PetSmart/5279240?$sclp-prd-main_large$" className={styles.catImage} />
      <p className={styles.textUnderImage}>Authority® Everyday<br></br> Health Indoor Cat Dry Food <br></br>Chicken & Rice...</p>
    </div>
    <div className={styles.secondItemContainer}>
      <img src="https://s7d2.scene7.com/is/image/PetSmart/5309312?$sclp-prd-main_large$" className={styles.catImage} />
      <p className={styles.textUnderImage}>Authority® Everyday<br></br> Health Indoor Cat Dry Food <br></br>Chicken & Rice...</p>
    </div>
    <div className={styles.secondItemContainer}>
      <img src="https://s7d2.scene7.com/is/image/PetSmart/5309312?$sclp-prd-main_large$" className={styles.catImage} />
      <p className={styles.textUnderImage}>Authority® Everyday<br></br> Health Indoor Cat Dry Food <br></br>Chicken & Rice...</p>
    </div>
  </div>
  <div className={styles.categoryContainer}>
    
    <div className={styles.category}>
    <p className={styles.categoryText}>Shop top categories</p>
    <img src='https://s7d2.scene7.com/is/image/PetSmart/5154809' className={styles.categoryImage} />
    <p className={styles.textUnderImage}>Dry Cat Food</p>
    </div>
    <div className={styles.category}>
    <img src='https://s7d2.scene7.com/is/image/PetSmart/1221618' className={styles.categoryImage} />
    <p className={styles.textUnderImage}>Wet Cat Food</p>
    </div>
    <div className={styles.category}>
    <img src='https://s7d2.scene7.com/is/image/PetSmart/5322123' className={styles.categoryImage} />
    <p className={styles.textUnderImage}>Cat Treats</p>
    </div>
    <div className={styles.category}>
    <img src='https://s7d2.scene7.com/is/image/PetSmart/5253394' className={styles.categoryImage} />
    <p className={styles.textUnderImage}>Frozen Cat Food</p>
    </div>
     </div> 
     <div className={styles.renderedData}>
  <div className={styles.Filter}>
    <button className={styles.FilterButton} name='filter-button' onClick={() => handleButtonClick('filter-button')}> ≡  Filters</button>

    <div className={showFilterMenu ? styles.overlay : ''} />

  <div 
  ref={filterMenuRef}
  className={`${styles.filterMenu} ${showFilterMenu ? styles.showFilterMenu : ''}`}>



                      { /* ------> Brand Section <-------- */}
    <div className={styles.Brand}>
      <p className={styles.brandtext}>Brand</p>
      <span className={`${styles.Arrow} ${brandDiv ? styles.rotate : ''}`} name='displayDiv' onClick={() => handleButtonClick('displayDiv-brand')}>
      &#9660;
      </span>
    <ul className={`${styles.filterList} ${brandDiv ? styles.showList : ''}`}>
  
  <li>
    <input
      type="checkbox"
      id="brand-authority"
      name="brand"
      value="Authority"
      checked={filterValue.brand === 'Authority'}
      onChange={handleButtonClick}
    />
  Authority
  </li>
  <li>
    <input
      type="checkbox"
      id="brand-beneful"
      name="brand"
      value="Beneful"
      checked={filterValue.brand === 'Beneful'}
      onChange={handleFilterValue}
    />
  Beneful
  </li>
  <li>
    <input
      type="checkbox"
      id="brand-beyond"
      name="brand"
      value="Beyond"
      checked={filterValue.brand === 'Beyond'}
      onChange={handleFilterValue}
    />
    Beyond
  </li>
  <li>
    <input
      type="checkbox"
      id="brand-bil-jac"
      name="brand"
      value="Bil-Jac"
      checked={filterValue.brand === 'Bil-Jac'}
      onChange={handleFilterValue}
    />
   Bil-Jac
  </li>
  <li>
    <input
      type="checkbox"
      id="brand-blue-buffalo"
      name="brand"
      value="Blue Buffalo"
      checked={filterValue.brand === 'Blue Buffalo'}
      onChange={handleFilterValue}
    />
    Blue Buffalo
  </li>
</ul>
              { /* ------> Price Section <-------- */}
    </div>
    <div className={styles.Price}>
    <p className={styles.pricetext}>Price</p>
      <span className={`${styles.Arrow} ${priceDiv ? styles.rotate : ''}`} name='displayDiv' onClick={() => handleButtonClick('displayDiv-price')}>
      &#9660;
      </span>
  <ul className={`${styles.filterList} ${priceDiv ? styles.showList : ''}`}>
    <li>
      <input
      className={styles.checkboxes}
        type="checkbox"
        id="price-5"
        name="price"
        value="$5"
        checked={filterValue.price === '$5'}
        onChange={handleFilterValue}
      />
      $5
    </li>
    <li>
      <input
        type="checkbox"
        id="price-5-10"
        name="price"
        value="$5-10"
        checked={filterValue.price === '$5-10'}
        onChange={handleFilterValue}
      />
      $5-10
    </li>
    <li>
      <input
        type="checkbox"
        id="price-10-15"
        name="price"
        value="$10-15"
        checked={filterValue.price === '$10-15'}
        onChange={handleFilterValue}
      />
      $10-15
    </li>
    <li>
      <input
        type="checkbox"
        id="price-20-50"
        name="price"
        value="$20-50"
        checked={filterValue.price === '$20-50'}
        onChange={handleFilterValue}
      />
      $20-50
    </li>
    <li>
      <input
        type="checkbox"
        id="price-25-50"
        name="price"
        value="$25-50"
        checked={filterValue.price === '$25-50'}
        onChange={handleFilterValue}
      />
      $25-50
    </li>
    <li>
      <input
        type="checkbox"
        id="price-50-100"
        name="price"
        value="$50-100"
        checked={filterValue.price === '$50-100'}
        onChange={handleFilterValue}
      />
      $50-100
    </li>
  </ul>
 </div> 
                  { /* ------> Product Rating Section <-------- */}
<div className={styles.ProductRating}>
<p className={styles.ratingtext}>Rating</p>
      <span className={`${styles.Arrow} ${ratingDiv ? styles.rotate : ''}`} name='displayDiv' onClick={() => handleButtonClick('displayDiv-rating')}>
      &#9660;
      </span>
  <ul className={`${styles.filterList} ${ratingDiv ? styles.showList : ''}`}>
    <li>
      <input
        type="checkbox"
        id="rating-4-plus"
        name="productrating"
        value="4+"
        checked={filterValue.productrating === '4+'}
        onChange={handleFilterValue}
      />
      4+
    </li>
    <li>
      <input
        type="checkbox"
        id="rating-3-4"
        name="productrating"
        value="3-4"
        checked={filterValue.productrating === '3-4'}
        onChange={handleFilterValue}
      />
      3-4
    </li>
    <li>
      <input
        type="checkbox"
        id="rating-2-3"
        name="productrating"
        value="2-3"
        checked={filterValue.productrating === '2-3'}
        onChange={handleFilterValue}
      />
      2-3
    </li>
    <li>
      <input
        type="checkbox"
        id="rating-1-2"
        name="productrating"
        value="1-2"
        checked={filterValue.productrating === '1-2'}
        onChange={handleFilterValue}
      />
      1-2
    </li>
  </ul>
</div>

          { /* ------> Food Category Section <-------- */}
<div className={styles.FoodCategory}>
<p className={styles.ratingtext}>Food Category</p>
      <span className={`${styles.Arrow} ${foodcategoryDiv ? styles.rotate : ''}`} name='displayDiv' onClick={() => handleButtonClick('displayDiv-foodcategory')}>
      &#9660;
      </span>
  <ul className={`${styles.foodcategoryfilterList} ${foodcategoryDiv ? styles.showList : ''}`}>
    <li>
      <input
        type="checkbox"
        id="food-category-natural"
        name="foodcategory"
        value="Natural"
        checked={filterValue.foodcategory === 'Natural'}
        onChange={handleFilterValue}
      />
      Natural
    </li>
    <li>
      <input
        type="checkbox"
        id="food-category-premium-natural"
        name="foodcategory"
        value="Premium Natural"
        checked={filterValue.foodcategory === 'Premium Natural'}
        onChange={handleFilterValue}
      />
      Premium Natural
    </li>
    <li>
      <input
        type="checkbox"
        id="food-category-specialized-nutrition"
        name="foodcategory"
        value="Specialized Nutrition"
        checked={filterValue.foodcategory === 'Specialized Nutrition'}
        onChange={handleFilterValue}
      />
      Specialized Nutrition
    </li>
    <li>
      <input
        type="checkbox"
        id="food-category-value-brands"
        name="foodcategory"
        value="Value Brands"
        checked={filterValue.foodcategory === 'Value Brands'}
        onChange={handleFilterValue}
      />
      Value Brands
    </li>
    <li>
      <input
        type="checkbox"
        id="food-category-vet-authorized-diets"
        name="foodcategory"
        value="Vet-Authorized Diets"
        checked={filterValue.foodcategory === 'Vet-Authorized Diets'}
        onChange={handleFilterValue}
      />
      Vet-Authorized Diets
    </li>
  </ul>
</div>
        { /* ------> Flavor Section <-------- */}
<div className={styles.Flavor}>
<p className={styles.ratingtext}>Flavor</p>
      <span className={`${styles.Arrow} ${flavorDiv ? styles.rotate : ''}`} name='displayDiv' onClick={() => handleButtonClick('displayDiv-flavor')}>
      &#9660;
      </span>
  <ul className={`${styles.flavorfilterList}  ${flavorDiv ? styles.showList : ''}`}>
    <li>
      <input
        className={styles.checkboxes}
        type="checkbox"
        id="flavor-beef"
        name="flavor"
        value="Beef"
        checked={filterValue.flavor === 'Beef'}
        onChange={handleFilterValue}
      />
      Beef
    </li>
    <li>
      <input
        type="checkbox"
        id="flavor-chicken"
        name="flavor"
        value="Chicken"
        checked={filterValue.flavor === 'Chicken'}
        onChange={handleFilterValue}
      />
      Chicken
    </li>
    <li>
      <input
        type="checkbox"
        id="flavor-duck"
        name="flavor"
        value="Duck"
        checked={filterValue.flavor === 'Duck'}
        onChange={handleFilterValue}
      />
      Duck
    </li>
    <li>
      <input
        type="checkbox"
        id="flavor-fish"
        name="flavor"
        value="Fish"
        checked={filterValue.flavor === 'Fish'}
        onChange={handleFilterValue}
      />
      Fish
    </li>
    <li>
      <input
        type="checkbox"
        id="flavor-lamb"
        name="flavor"
        value="Lamb"
        checked={filterValue.flavor === 'Lamb'}
        onChange={handleFilterValue}
      />
      Lamb
    </li>
    <li>
      <input
        type="checkbox"
        id="flavor-other"
        name="flavor"
        value="Other"
        checked={filterValue.flavor === 'Other'}
        onChange={handleFilterValue}
      />
      Other
    </li>
  </ul>
  </div>
</div>
</div>
  <div className={styles.itemsContainer}>
    
  {filterdData.length > 0 ? (
    filterdData.map((pets, index) => (
      <div key={index} className={styles.petItems}>
        <img src={`data:image/jpeg;base64,${pets.imageData}`} alt='Item' className={styles.textUnderImage} />
        <p className={styles.ItemName}>{pets.itemName}</p>
        <p className={styles.itemPrice}>{pets.itemPrice}</p>
        <p className={styles.Autoship}>Save 40% On Your First Autoship Order!<br />Free Same-Day Delivery!</p>
      </div>
    ))
  ) : (
    <p>No Item Found</p>
  )}
  </div>
</div>
    </div>
  )
  break;
  case 'dog':
    console.log('this is case for pet dog');
    RenderEachPet = (
      <div>
      <img src='https://s7d2.scene7.com/is/image/PetSmart/WEB-1580213-Nov22_CAT-BNR1_Cat-Food-Treats_DT' className='cat-image' />
      <p>Shop Dog Food & Treats</p>
      
      <div >
        <p>PetSmart Exclusive Items</p>
      <img src='https://s7d2.scene7.com/is/image/PetSmart/WEB-2192011-Feb24_PCS2_Sitewide_DT' className='cat-image'/>
      </div>
      <div className=''>
      <img src='https://s7d2.scene7.com/is/image/PetSmart/5279240?$sclp-prd-main_large$' className='cat-image' />
      <img src='https://s7d2.scene7.com/is/image/PetSmart/5309312?$sclp-prd-main_large$' className='cat-image'/>
      <img src='https://s7d2.scene7.com/is/image/PetSmart/5309312?$sclp-prd-main_large$' className='cat-image' />
      </div>
      <div>
        <p>Shop top categories</p>
        <img src='https://s7d2.scene7.com/is/image/PetSmart/WEB-1696102-Mar23_TMR1_CAT-CONS-LP-Food_DT' />
        <img src='https://s7d2.scene7.com/is/image/PetSmart/5154809' />
        <img src='https://s7d2.scene7.com/is/image/PetSmart/1221618' />
        <img src='https://s7d2.scene7.com/is/image/PetSmart/1221618' />
        <img src='https://s7d2.scene7.com/is/image/PetSmart/5322123' />
        <img src='https://s7d2.scene7.com/is/image/PetSmart/5253394' />
        </div>
      </div>
      
    );
    break;
    
}




useEffect(() => {
    fetchData();
},[])

return (
  <div>
    {RenderEachPet}
  </div>
);
    }

export default PetDetails