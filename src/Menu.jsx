import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css'
import RatingStars from './misc/RatingStars';
const Menu = ({ data,handleanotherfilter }) => {
  const [menuStates, setMenuStates] = useState({}); // State to store toggle states for each menu section

  const handleButtonClick = (menuTitle) => {

    
    setMenuStates(prevStates => ({
      ...prevStates,
      [menuTitle]: !prevStates[menuTitle], // Toggle the state for the clicked menu section
    }));
  
    
  };
 


  const menus = [
    {
      title: 'Pets',
      items: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },

      ],
    },
    {
      title: 'Food Form',
      items: [
        { label: 'Dry Food', value: 'dry' },
        { label: 'Wet Food', value: 'wet' },
      ],
    },
    {
      title: 'Price',
      items: [
        { label: '10$ to 25$', value: '10 to 25$' },
        { label: '25$ to 50$', value: '25 to 50$' },
        { label: '50$ to 100$', value: '50 to 100$' },
      ],
    },
    {
      title: 'Rating',
      items: [
        { label: <RatingStars  value='5'/>,value: '5' },
        { label: <RatingStars  value='4'/> , value: '4'},
        { label: <RatingStars  value='3'/>, value: '3'},
        { label: <RatingStars  value='2'/>, value: '2'},
        { label: <RatingStars  value='1'/>, value: '1' },

      ]
    }
  ];

  return (
    <div>
      {menus.map((menu, index) => (
        <div key={index} className={`${styles.containerCheckbox} ${styles['containerCheckbox-' + (index + 1)]}`}>
          <div className={styles.menuTitle} onClick={() => handleButtonClick(menu.title)}>
            {menu.title} {menuStates[menu.title] ? '-' : '+'} {/* Use menuStates to toggle visibility */}
          </div>
          <div className={menuStates[menu.title] ? styles.showList : styles.labelContainer}> {/* Apply styles based on menuStates */}
            {menu.items.map((item, itemIndex) => (
              <label key={itemIndex}>
                <input
                  type="checkbox"
                  value={item.value}
                  name={menu.title.toLowerCase()}
                  onChange={(e) => handleanotherfilter(e)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Menu;
