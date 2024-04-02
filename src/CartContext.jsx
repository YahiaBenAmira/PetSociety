import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import styles from './Cart.module.css';
import { FaTrash } from 'react-icons/fa';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartMenuOpen, setCartMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const cartMenuRef = useRef(null);
    // Move useNavigate inside the component

    const addToCart = (item) => {
        console.log('Adding item to cart:', item);

        // Check if the item already exists in the cart
        if (!cartItems.some(cartItem => cartItem.items_id === item.items_id)) {
            console.log('Item does not exist in cart. Adding item...', cartItems);
            setCartItems(prevCartItems => {
                const updatedCartItems = [...prevCartItems, item];
                sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                 // Navigate after updating state
                return updatedCartItems;
            });
        } else {
            console.log('Item already exists in cart. Skipping...');
        }
    };

    const handleDeleteItem = (itemId) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.filter((item) => item.items_id !== itemId);
            sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    let itemQuantity;
    switch (itemQuantity) {
        case '+':
            setQuantity(prevQuantity => prevQuantity + 1);
            break;
        case '-':
            setQuantity(prevQuantity => prevQuantity - 1);
            break;
        default:
            break;
    }

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleClickOutside = (event) => {
        if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
            // Check if the clicked element is not a descendant of the menu
            if (!event.target.closest(`.${styles.CartMenuContainer}`)) {
                setCartMenuOpen(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCartMenuToggle = (event) => {
        event.stopPropagation();
        // Check if the clicked element is inside the menu
        if (cartMenuRef.current && cartMenuRef.current.contains(event.target)) {
            return; // Don't toggle the menu if clicked inside
        }
        setCartMenuOpen((cartMenuOpen) => !cartMenuOpen);
    };

    const CartMenu = () => {
        return (
            <>
                {cartMenuOpen && <div className={styles.overlay} onClick={handleCartMenuToggle} />}
                <div ref={cartMenuRef} className={`${styles.CartMenuContainer} ${cartMenuOpen ? styles.showCartMenu : ''}`} onClick={handleCartMenuToggle}>
                    <div className={styles.menuContent}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.menuItem}>
                                <img rc={`data:image/jpeg;base64,${item.imageData}`} alt='Item' className={styles.itemImage} />
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemName}>{item.itemName}</div>
                                    <div className={styles.itemPrice}>{item.itemPrice}</div>
                                    <div className={styles.quantityContainer}>
                                        <span className={styles.quantityLabel}>Quantity:</span>
                                        <div className={styles.quantityControl}>
                                            <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, '+'); }}>+</button>
                                            <span>{quantity}</span>
                                            <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, '-'); }}>-</button>
                                        </div>
                                    </div>
                                </div>
                                <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteItem(item.items_id)} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    const contextValue = {
        cartItems,
        addToCart,
        cartMenuOpen,
        CartMenu,
        handleCartMenuToggle
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context
      ) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};
