import React,{useState,useRef,useEffect} from 'react';
import styles from './Navbar.module.css'; // Your CSS file for styling
import { FaUser, FaShoppingCart,FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons library
import { Link } from 'react-router-dom';
import Cart from './Cart.jsx'
import logo from './assets/logo-color.png'
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
    const [isLoggedin , setisLoggedin] = useState(true)
 const {handleCartMenuToggle,CartMenu} = useCart();
 const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(''); // State to track selected pet
  const filterMenuRef = useRef(null);
 


  const menuOptions = {
    Cats: {
      FOOD: ['Dry Food', 'Wet Food', 'Kitten Food', 'Senior Food', 'Veterinary Diet', 'Food Toppers'],
      TREATS: ['Crunchy Treats', 'Soft Treats', 'Freeze-Dried Treats', 'Dental Treats', 'Natural Treats'],
      SUPPLIES: ['Beds', 'Bowls', 'Litter Boxes', 'Scratching Posts', 'Toys', 'Carriers'],
      'HEALTH WELLNESS': ['Vitamins & Supplements', 'Flea & Tick Control', 'Dental Care', 'Grooming'],
      SERVICES: ['Veterinary Care',
       'Grooming', 
       'Boarding', 'Pet Insurance']
    },
    Dogs: {
      FOOD: ['Dry Food', 'Wet Food', 'Puppy Food', 'Veterinary Diet', 'Food Toppers'],
      TREATS: ['Biscuits', 'Soft Treats', 'Jerky Treats', 'Training Treats', 'Dental Chews'],
      SUPPLIES: ['Beds', 'Collars', 'Leashes', 'Toys', 'Crates', 'Grooming'],
      'HEALTH WELLNESS': ['Pharmacy', 'Flea & Tick', 'Vitamins & Supplements', 'Dental Care'],
      SERVICES: ['Grooming', 'Training', 'Veterinary Services', 'Pet Insurance'],
     
    },
    Birds: {
      Food: ['Seed Mixes', 'Pellets', 'Treats', 'Nectar'],
      'CAGES ACCESSORIES': ['Cages', 'Perches', 'Toys', 'Nesting Materials'],
      'SHOP BY BIRD': ['Conure Shop',
      ' Finch & Canary Shop',
       'Lovebird Shop',
       'Parakeet Shop',
       'Wild Bird Shop',
      ' Parrot Shop',
      ' Cockatiel Shop',
       'Chicken Shop',
     ],
     
      'HEALTH WELLNESS': ['Vitamins & Supplements', 'First Aid', 'Bird Grooming']
    },
    Reptiles: {
      FOOD: ['Pellets', 'Insects', 'Frozen Foods', 'Live Foods'],
      TERRARIUMS: ['Enclosures', 'Heating', 'Lighting', 'Decor', 'Substrate'],
      'HEALTH WELLNESS': ['Vitamins & Supplements', 'Hydration', 'Terrarium Cleaning']
    }
  };
  const petTitles = Object.keys(menuOptions)
  const petEntries = Object.entries(menuOptions)

  let menuItems;
  switch (menuItems) {
    case 'Cats':
      menuItems = menuOptions.Cats;
   
      break;
    case 'Dogs':
      menuItems = menuOptions.Dogs;
      break;
    case 'Birds':
      menuItems = menuOptions.Birds;
      break;
    case 'Reptiles':
      menuItems = menuOptions.Reptiles;
      break;
    default:
      menuItems = {};
      break;
  }

  const renderMenu = () => {
    return (
      <div>
  {petTitles.map((title, index) => (
    <div key={index} className={styles.petTitles} onMouseEnter={() => handlePetHover(title)} onMouseLeave={handleMouseLeave}>
      {title}
      {selectedPet === title && (
        <div className={styles.subEntries}>
          {petEntries.map(([petType, categories], i) => {
            if (petType === title) {
              return (
                <div key={i} className={styles.petEntries}>
                  {Object.entries(categories).map(([category, items], j) => (
                    <div key={j} className={styles.categoriesContainer}>
                      <p className={styles.categoryTitle}>{category}</p>
                      <div className={styles.itemList}>

                        {items.map((item, k) => (
                        <div>
                          
                          <li key={k} className={styles.item}>{item}</li>
                        
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  ))}
</div>
    )
  };
  

  const handlePetHover = (pet) => {
    setSelectedPet(pet);
    
  };

  const handleMouseLeave = () => {
    if(!selectedPet) { 
      setSelectedPet(null)
    }
  };

  const HandleMenuOpen = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]); // Listen to changes in menuOpen state
  





return (
  <header>
    <div className={styles.mainHeaderDiv}>
  
      <div className={styles.navBar}>
      <img src={logo} className={styles.logo} alt="Logo" />
        <div className={styles.menuContainer}>
        <div className={styles.hamburgerMenu + (menuOpen ? ' ' + styles.closeMenu : '')} onClick={HandleMenuOpen}>
  {menuOpen ? 'X' : '☰'}
</div>

     
  
          
          <div ref={filterMenuRef} className={`${styles.openingMenu} ${menuOpen ? styles.showMenu : ''}`}>
            {renderMenu()}
            <div  onClick={() => console.log('kamel weld jbal ')}>
            {isLoggedin ? <FaUser className={styles.Login} /> : <FaSignOutAlt className={styles.Signout}/>}
            </div>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <input type='text' placeholder='Search' className={styles.searchInput} />
          <span role='img' aria-label='search' className={styles.searchIcon}>🔍</span>
        </div>
        <div className={styles.userCartIcons}>
          <FaUser className={styles.userIcon}/>
          <div className={styles.separator}></div>
          <FaShoppingCart  className={styles.cartIcon} onClick={() => navigate('/checkout')} />
         
        </div>
      </div>
    </div>
  </header>
);
};


export default Navbar;
