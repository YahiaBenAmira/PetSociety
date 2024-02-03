import React from 'react';
import './Navbar.css'; // Your CSS file for styling
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import icons from react-icons library

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <div className="hamburger-menu">
          <button className="hamburger-button">
            ☰ {/* You can use a hamburger icon here */}
          </button>
          <ul className="dropdown-menu">
            <li>Dogs</li>
            <li>Cats</li>
            <li>Birds</li>
            <li>Fish</li>

            <li>Pharmacy</li>
            <li>Appointments</li>
          </ul>
        </div>
        <ul className="main-menu">
          <li>Pet Society</li>
        </ul>
      </div>
      <div className="search-label">
        <label htmlFor="search"></label>
        <input type="text" id="search" placeholder="Search..." />
      </div>
      <div className="right-section">
        <ul className="account-cart">
          <li>
            <FaUser className="icon" /> Account
          </li>
          <li>
            <FaShoppingCart className="icon" /> Cart
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
