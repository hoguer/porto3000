import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import carticon from '../images/carticon.png';
import navName from '../images/navName.png'

import {
  // getSomething
} from '../api';

import {
  About,
  Cart,
  Home,
  Login,
  Products,
  SingleProduct,
  Register
} from "."


const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return <> 
    <div className="App">
      <div className='header'>
        <img src={navName} className='mainLogo'/>
      </div>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/"> Home </NavLink> 
          <NavLink to="/about"> About Us</NavLink> 
          <NavLink to="/products"> Products </NavLink> 
          {
            isLoggedIn?
            <>
                <NavLink to="/account"> Account </NavLink> 
                <NavLink to="/" onClick={() => {
                  setToken("")
                  setIsLoggedIn(false)
                  setCurrentUser(false)
                }}> Logout  </NavLink>
              </>
              :
              <> 
                <NavLink to="/login"> Login </NavLink> 
                <NavLink to="/register"> Register </NavLink> 
              </>
          }
          <NavLink to="/cart"><img src={carticon} alt="icon" className='cartIcon'></img> </NavLink> 
        </div>
      </nav>
      <Routes>
        <Route path="/about" exact element={<About />}/>
        <Route path="/cart" exact element={<Cart />}/>
        <Route path="/" exact element={<Home />}/>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/products" exact element={<Products currentUser= {currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<SingleProduct token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/register" exact element={<Register currentUser= {currentUser} token={token} />}/>

      </Routes>
    </div>
  </>;
}

export default App;