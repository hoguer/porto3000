import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Account.css";

const Account = ({currentUser, setCurrentUser, setIsLoggedIn, token, isLoggedIn}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isActive, setActive] = useState(false)
  
  useEffect(() => {
     
    axios.get(`/api/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        console.log('IN ACCOUNT', res);
        console.log('Fetched User: ', res.data.username);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setAddress(res.data.address);
        setIsAdmin(res.data.isAdmin)
      })
      .catch(error => console.error(error));
  }, []);

  // const toggleAdminPrivileges = () => {
  //   setActive(!isActive);
  // };

  const getAllOrdersHandler = async () => {
    console.log("Gathering all the orders")
    axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      console.log("orders", res.data)
    })
  }

  const getAllProductsHandler = async () => {
    console.log("Gathering all the products")
    axios.get("/api/products")
    .then(res => {
      console.log("products", res.data)

    })
  }

  const getAllUsersHandler = async () => {
    console.log("I am here!")
    axios.get("/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => { 
        console.log("users", res.data)
    })
  };

  return ( 
    <>
      {/* <h1 className="header">Account</h1> */}
      <div className="account-container">
        <h3>Personal Information</h3>
        <div className="accountdiv">
          <label className="account-label"> First Name:</label> 
          <p className="account-info">{firstname}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label">Last Name:</label>
          <p className="account-info">{lastname}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Email:</label>
          <p className="account-info">{email}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Username:</label>
          <p className="account-info">{username}</p>
        </div>
        <div className="accountdiv">
          <label className="account-label"> Address:</label>
          <p className="account-info">{address}</p>
        </div>
      </div>
      {
        isAdmin ?
          <>
            <div className="adminButtons">
              <button className="adminAbility" onClick={() => {getAllOrdersHandler()}}> View all orders </button> 
              <button className="adminAbility" onClick={() => {getAllProductsHandler()}}> View / Edit Products </button> 
              <button className="adminAbility" onClick={() => {getAllUsersHandler()}}> View all users </button>
            </div>
            <div className="allUsers"></div>
          </>
        :
          null
        }
    </>
    )
}

export default Account; 