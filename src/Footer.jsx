import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>Your text about your company or website.</p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: petsociety@testing.com<br />Phone: +1234567890</p>
        </div>
        <div className="footer-section links">
          
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 PetSociety.com
      </div>
    </div>
  );
};

export default Footer;
