import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import './Items.css'
import Menu from './Menu';
import ItemCarousel from './ItemCarousel';
function Items () { 
const [data,setData] = useState([])
const menus = [
  {
    title: 'Pets',
    items: [
      { label: 'Dog', value: 'dogs' },
      { label: 'Cat', value: 'cats' },
      { label: 'Bird', value: 'birds' },
      { label: 'Fish', value: 'fish' },
    ],
  },
  {
    title: 'Food Form',
    items: [
      { label: 'Dry Food', value: 'dry food' },
      { label: 'Wet Food', value: 'wet food' },
    ],
  },
  {
    title: 'Flavor',
    items: [
      { label: 'Chicken', value: 'chiken' },
      { label: 'Turkey', value: 'turkey' },
    ],
  },
  {
    title: 'Price',
    items: [
      { label: '10$ to 25$', value: '10 to 25$' },
      { label: '25$ to 50$', value: 'wet food' },
      { label: '50$ to 100$', value: 'wet food' },
    ],
  },
];
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8002/api/items/');
            if (response.status === 200 || response.status === 201) {
                setData(response.data.data);
           
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
}, []); 

  return (

    <div className='main-container'>

  <div className='filters'>
 
  <Menu menus={menus} />
</div>
  <div className='image-container'>
    <div className='image-grid'>
      {data.map((filteredItem) => (
        <div key={filteredItem.items_id} className='image-item'>
          {filteredItem.imageData && (
            <div className='image-wrapper'>
              <img src={`data:image/jpeg;base64,${filteredItem.imageData}`} alt='Item' className='item-image' />
            </div>
          )}
          <div className='item-details'>
            <p className='item-name'>{filteredItem.itemName}</p>
            <p className='item-price'>{filteredItem.itemPrice}</p>
            <p className='add-to-cart'>Add to Cart</p>
            {/* Include other item details */}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  )
  
          }

export default Items