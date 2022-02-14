import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, NavLink, useParams } from "react-router-dom";
import './App.css';
import carticon from '../images/carticon.png';
import navName from '../images/navName.png'
import {
  About,
  Cart,
  Home,
  Login,
  NewProduct,
  Products,
  SingleOrder,
  SingleProduct,
  Register,
  Account
} from "."

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  let { orderId } = useParams();
  
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
                  setIsAdmin(false)
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
        <Route path="/cart" element={<Cart currentUser={currentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/login" exact element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/products" exact element={<Products currentUser= {currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" exact element={<SingleProduct currentUser={currentUser} token={token} products={products} setProducts={setProducts}/>} />
        <Route path="/register" exact element={<Register setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser= {currentUser} token={token} />}/>
        <Route path="/account" exact element={<Account currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/orders/:orderId" exact element={<SingleOrder orderId={orderId} />}/>
        <Route path="/newproduct" element={<NewProduct currentUser={currentUser} token={token}/>}/>
      </Routes>
    </div>
  </>;
}

export default App;