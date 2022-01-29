import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom";

// import {
// getSomething
// } from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <h1>porto3000</h1>
      <nav className="navigation">
        <div className="nav-links">
          <NavLink to="/"> Home </NavLink> 
          <NavLink to="/products"> Products </NavLink> 
          <NavLink to="/about"> About Us</NavLink> 
          <NavLink to="/checkout"> Checkout </NavLink> 
          {/* {
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
          } */}
        </div>
      </nav>
      {/* <Routes> 
        <Route path="/products" element={<Products/>}/>
      </Routes> */}
    </div>
  );
}

export default App;