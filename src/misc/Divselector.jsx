import React, { useState } from 'react';

const Divselector = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=''>
      <p onClick={toggleSection}>{title}</p>
      {isOpen && (
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Divselector;
