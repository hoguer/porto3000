import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import './App.css';
import carticon from '../images/carticon.png';
import navName from '../images/navName.png'

import {
  About,
  Cart,
  Home,
  Login,
  Products,
  SingleProduct,
  Wines,
  Cheeses,
  ProductPairs,
  Register,
  Account
} from "."

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [products, setProducts] = useState([]);

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
        <Route path="/" exact element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" exact element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/products" exact element={<Products currentUser= {currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<SingleProduct token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/register" exact element={<Register currentUser= {currentUser} token={token} />}/>
        <Route path="/account" exact element={<Account currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/products/wines" element={<Wines token={token} products={products} setProducts={setProducts}/>}/>
        <Route path="/products/cheeses" element={<Cheeses token={token} products={products} setProducts={setProducts}/>}/>
        <Route path="/products/productpairs" element={<ProductPairs token={token} products={products} setProducts={setProducts}/>}/>
      </Routes>
    </div>
  </>;
}

export default App;