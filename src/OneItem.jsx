import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer.jsx'
import styles from './OneItem.module.css'
import ReviewCounter from './ReviewCounter.jsx';
import RatingStars from './misc/RatingStars';
import { useCart } from './CartContext.jsx'


import Cart from './Cart.jsx';
function OneItems() {
    const { id } = useParams();
    const {addToCart,cartMenuOpen} = useCart();
    const [reviewCount,setReviewCount] = useState('')
    const [data, setData] = useState(null); // Change initial state to null
    const [qunantity,setQuantity] = useState('')
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8002/api/items/${id}/item`);
                if (response.status === 200) {
                    
                    setData(response.data.data);
                    setReviewCount(response.data.data.productRating) // Set data to response.data.data
                }
            } catch (error) {
                console.error(error);
                setData(null);
            }
        };

        fetchData();
    }, [id]); // Use id directly as a dependency









    return (
     

        <div className={`${styles.MainContainer} ${cartMenuOpen ? styles.overlay : ''}`}>
            <div className={styles.Navigation}>
                <Navbar />
            </div>
            <div className={styles.DataContainer}>
            {data ? ( // Check if data is truthy
                <div key={data.items_id} className={styles.styl}> 
    <div className={styles.imageContainer}>

    <img src={`data:image/jpeg;base64,${data.imageData}`} alt='Item' className={styles.itemImage} />
        </div>
        <div className={styles.itemInformationContainer}>

                    <p className={styles.itemName}>{data.itemName}</p>
                    <p className={styles.itemPrice}>{data.itemPrice}.00</p>
                    
                    <RatingStars value={data.productRating} />
                    <button onClick={() => addToCart(data)}>Click me!</button>

            </div>
                </div>
            ) : (
                <p>Loading...</p> 
            )}

            </div>
         <div className={styles.reviewSection}>
                <h3>Reviews</h3>
          

         </div>
         <div className={styles.reviewData}>
              
                   <ReviewCounter reviewCount={reviewCount}/>
             
                    
                </div>
          <Footer />   
        </div>
    );
}

export default OneItems;
