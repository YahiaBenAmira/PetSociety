import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Register from './Register'
import Login from './Login';
import Home from './Home';
import Items from './Items';
import OneItems from './OneItem';
import PetDetails from './PetDetails'
import { MyContextProvider } from './DataContext';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import Cart from './Cart';

const App = () => {
  return (
    <MyContextProvider>
      <CartProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/allitems" element={<Items />} />
        <Route path="/:petType" element={<PetDetails />} />
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='/:id/item' element={<OneItems />} />
        <Route path='/checkout' element={<Cart />} />
      </Routes>
    </Router>
    </CartProvider>
    </MyContextProvider>
  );
};

export default App;
