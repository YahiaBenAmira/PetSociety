import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
// Create a context
const MyContext = createContext();

// Create a context provider component
export const MyContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8002/api/items/');
      if (response.status === 200 || response.status === 201) {
        setSharedData(response.data.data);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the context provider mounts
  }, []);

  const updateData = (newData) => {
    setSharedData(newData);
  };






  return (
    <MyContext.Provider value={{ sharedData, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to consume the context
export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};
