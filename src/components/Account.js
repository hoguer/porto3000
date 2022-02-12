import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Account.css";


const Account = ({currentUser, setCurrentUser, setIsLoggedIn, token}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  

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
          })
          .catch(error => console.error(error));
  }, []);
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
                           

    </>
    )
}

export default Account; 