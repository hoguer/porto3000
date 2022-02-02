import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Register =({currentUser, setCurrentUser, setIsLoggedIn, token}) =>{
    const [user, setUser] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
}

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

            if (res.data.status === 'PasswordShort') {
                alert('Password is too short. Please create a password at least eight characters long.');
            } else if (res.data.status === 'UserExists') {
                alert('That username already exists. Please pick a different username.');
            } else {
                setUser(res.data.user);

                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem('token'));

                if (res.data.user) {
                    setIsLoggedIn(true);
                }
            }
        })
        .catch(error => {
            console.error('Error registering user!', error);
        })

};

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
    <h2 className="createUserHeader">Create Your User Profile</h2>
    <form className="createUserForm">
       <Form.Field required>
           <label>First Name:</label>
           <Input type="text" Placeholder="Name" onChange={event => setFirstname(event.target.value)} value={firstname} />
       </Form.Field>
       <Form.Field required>
           <label>Last Name:</label>
           <Input type="text" Placeholder="Last Name" onChange={event => setLastname(event.target.value)} value={lastname} />
       </Form.Field>
       <Form.Field required>
           <label>Email Address:</label>
           <Input type="text" Placeholder="Email" onChange={event => setEmail(event.target.value)} value={email} />
       </Form.Field>
       <Form.Field required>
           <label>Username:</label>
           <Input type="text" Placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} />
       </Form.Field>
       <Form.Field required>
           <label>Password:</label>
           <Input type="password" Placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
       </Form.Field>
       <Form.Field required>
           <label>Confirm Password:</label>
           <Input type="password" Placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
       </Form.Field>
       <Form.Field required>
           <label>Street Address:</label>
           <Input type="text" Placeholder="Street Address" onChange={event => setAddress(event.target.value)} value={address} />
       </Form.Field>
    </form>
    </>
)


export default Register;
