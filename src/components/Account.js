import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


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
  <h1>Account</h1>
      <div>
          <label> First Name:</label>
          <p>{firstname}</p>
      </div>
      <div>
          <label> Last Name:</label>
          <p>{lastname}</p>
      </div>
      <div>
          <label> Email:</label>
          <p>{email}</p>
      </div>
      <div>
          <label> Username:</label>
          <p>{username}</p>
      </div>
      <div>
          <label> Address:</label>
          <p>{address}</p>
      </div>
                           

    </>
    )
}

export default Account; 