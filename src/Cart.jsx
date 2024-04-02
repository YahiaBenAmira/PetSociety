import React, { useState,useEffect } from "react";
import Navbar from "./Navbar"; // Import Navbar component
import styles from './Cart.module.css';
import { useCart } from './CartContext.jsx'
import Footer from './Footer.jsx'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function Cart() { 
const [quantity,setQuantity] = useState(1)
const [total,setTotal] = useState(0)
const {cartItems} = useCart();
console.log(cartItems);


    const createOrder = (data, actions) => {
      // This function is called when the PayPal button is clicked.
      // You can create and configure the order here.
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total // Total amount of the purchase
            },
          },
        ],
      });
    };
  
    const onApprove = (data, actions) => {
      // This function is called when the payment is approved.
      // You can handle the successful payment here.
      return actions.order.capture().then(function (details) {
        // Show a success message to the user
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    };
  
    const onError = (err) => {
      // This function is called if an error occurs during the payment process.
      // You can handle errors here.
      console.error('An error occurred:', err);
    };
  





const handleQuantityChange = (operation) => {
    // Update the quantity based on the operation
    if (operation === '+' && quantity < 10) {
        setQuantity(prevQuantity => prevQuantity + 1);
    } else if (operation === '-' && quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
    }
};

const calculateTotal = () => {
    let totals = 0;
    cartItems.forEach(item => {
        // Extract numerical part of itemPrice and convert it to a number
        const price = parseFloat(item.itemPrice.replace('$', ''));
        console.log(price, quantity);
        totals += price * quantity;
    });
    setTotal(totals);
}



// Call calculateTotal whenever cartItems or quantity changes
useEffect(() => {
    calculateTotal();
}, [cartItems, quantity]);














    return(
<div>
    <Navbar />
    <div className={styles.mainContainer}>
        <div className={styles.seperator}>
    {cartItems.map((item => (
            <div className={styles.leftPanel}>
               
            <img src={`data:image/jpeg;base64,${item.imageData}`} alt='Item' className={styles.itemImage} />
            <div className={styles.itemnQuantity}>
            <p className={styles.name}>{item.itemName}</p>
                <div className={styles.quantityContainers}>
                    <span onClick={() => handleQuantityChange('+')}>+</span>
                    <p className={styles.quantityNumber} >{quantity}</p>
                    <span onClick={() => handleQuantityChange('-')}>-</span>
                    </div>
                   
          </div>
<div className={styles.radioButtons}>

            <label class="container">
  <input type="checkbox" />
  <span class="checkmark">Same Day Delivery</span>
</label>
<label class="container">
  <input type="checkbox" />
  <span class="checkmark">Standard Shipping</span>
</label>
<label class="container">
  <input type="checkbox" />
  <span class="checkmark">Free Pickup</span>
</label>
</div>
<p className={styles.price}>{item.itemPrice}  </p> 
             
</div>

    )))}
    </div>
<div className={styles.rightPanel}>
    <div className={styles.inputdiv}>
    <input placeholder="Enter Promo Code" className={styles.promoInput}></input>
<button className={styles.couponButton}>Apply</button>
    </div>

<div className={styles.OrderSummary}>
    <p>Order Summary</p> <p>Cart ID #130760936873523</p>
    <p>Subtotal:</p><p> ${total}.00</p>
    <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} 
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
            />
        </PayPalScriptProvider>
</div>
</div>

</div>
</div>
    );
}

export default Cart;
