import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register =({currentUser, setCurrentUser, setIsLoggedIn, token}) =>{
    const [user, setUser] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");


// if isLoggedIn, redirect to UserProfile/Home? //


    const registerUser = () => {
        console.log('In register user!!')

        if ( !firstname || !lastname || !username || !email || !password || !confirmPassword || !address ) {
            return;
        }

        if (password !== confirmPassword) return;

        console.log('Register User is being called!');
        axios.post('/api/users/register', { firstname, lastname, username, email, password, address })
            .then(res => {
                console.log('New User: ', res.data);
                console.log('Token: ', res.data.token);

            //     if (res.data.status === 'PasswordShort') {
            //         alert('Password is too short. Please create a password at least eight characters long.');
            //     } else if (res.data.status === 'UserExists') {
            //         alert('That username already exists. Please pick a different username.');
            //     } else {
            //         setUser(res.data.user);

            //         localStorage.setItem('token', res.data.token);
            //         console.log(localStorage.getItem('token'));

            //         if (res.data.user) {
            //             setIsLoggedIn(true);
            //         }
            //     }
            // })
            // .catch(error => {
            //     console.error('Error registering user!', error);
            // })

})}

    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
};



return (
    <>
    <h2 className="createUserHeader">Create Account</h2>
    <form className="createUserForm">
           <label>First Name:</label>
           <input type="text" placeholder="Name" onChange={event => setFirstname(event.target.value)} value={firstname} />
           <label>Last Name:</label>
           <input type="text" placeholder="Last Name" onChange={event => setLastname(event.target.value)} value={lastname} />
           <label>Email Address:</label>
           <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)} value={email} />
           <label>Username:</label>
           <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} />
           <label>Password:</label>
           <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
           <label>Confirm Password:</label>
           <input type="password" placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
           <label>Street Address:</label>
           <input type="text" placeholder="Street Address" onChange={event => setAddress(event.target.value)} value={address} />
    </form>
        <button onClick={(event) => {event.preventDefault();
                                        registerUser();
                                        clearForm(); }}> Submit </button>                                
    </>
)
}

export default Register;
