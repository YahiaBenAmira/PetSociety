import React, { useState } from 'react';
import './Menu.css'
const Menu = ({ menus }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className='menus'>
      {menus.map((menu, index) => (
        <div key={index} className='menu'>
          <div className='menu-header' onClick={() => toggleMenu(index)}>
            <span className='toggle-btn'>{openMenuIndex === index ? '-' : '+'}</span>
            {menu.title}
          </div>
          {openMenuIndex === index && (
            <div className='menu-content'>
             {menu.items.map((item, itemIndex) => (
  <label key={itemIndex} className='checkmark'>
    <input
      type='checkbox'
      id={`checkbox-${index}-${itemIndex}`}
      name='category'
      value={item.value}
    />
    <span className='checkbox-text'>{item.label}</span>
  </label>
))}


            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
