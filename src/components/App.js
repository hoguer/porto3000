import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import carticon from '../images/carticon.png';
import logo2 from '../images/logo2.png';
import {
  // getSomething
} from '../api';

import {
  About,
  Cart,
  Home,
  Login,
  Products
} from "."


const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
        <h1>porto3000</h1>
      </div>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/"> Home </NavLink> 
          <NavLink to="/products"> Products </NavLink> 
          <NavLink to="/about"> About Us</NavLink> 
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
                <NavLink to="/cart"><img src={carticon} alt="icon" className='cartIcon'></img> </NavLink> 
                {/* build the checkout component into the cart */}
              </>
          }
        </div>
      </nav>
      <Routes>
        <Route path="/about" exact element={<About />}/>
        <Route path="/cart" exact element={<Cart />}/>
        <Route path="/" exact element={<Home />}/>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/products" exact element={<Products currentUser= {currentUser} token={token} />} />
        {/* <Route path="/products/:id" element={<SingleProduct currentUser= {currentUser} token={token} />} /> */}
      </Routes>
    </div>
  </>;
}

export default App;