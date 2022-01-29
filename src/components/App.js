import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom";

// import {
//   // getSomething
// } from '../api';

import {
  About,
  Cart,
  Home,
  Login,
  Products
} from "../components"

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return <> 
    <div className="App">
      <h1>Porto 3000</h1>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/"> Home </NavLink> 
          <NavLink to="/products"> Products </NavLink> 
          <NavLink to="/about"> About Us</NavLink> 
          <NavLink to="/cart"> Cart </NavLink> 
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
        </div>
      </nav>
      <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/" exact element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/products" element={<Products currentUser= {currentUser} token={token} />} />
        <Route path="/products/:id" element={<SingleProduct currentUser= {currentUser} token={token} />} />
      </Routes>
    </div>
  </>;
}

export default App;