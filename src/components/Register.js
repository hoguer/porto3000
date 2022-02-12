import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register =({currentUser, setCurrentUser, setIsLoggedIn, token}) =>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const registerUser = () => {
        console.log('In register user!!')
        if ( !firstname || !lastname || !username || !email || !password || !confirmPassword || !address ) {
            return;
        }
        if (password !== confirmPassword) return;
        console.log('Register User is being called!');
        axios.post('/api/users/register', { firstname, lastname, username, email, password, address })
            .then(res => {
                console.log('New User: ', res.config.data);
                console.log('Token: ', res.data.token);
                if (res.data.status === 'PasswordShort') {
                    alert('Password is too short. Please create a password at least eight characters long.');
                } else if (res.data.status === 'UserExists') {
                    alert('That username already exists. Please pick a different username.');
                } else {
                    setCurrentUser(res.config.data);
                    localStorage.setItem('token', res.data.token);
                    console.log(localStorage.getItem('token'));

                    if (res.config.data) {
                        setIsLoggedIn(true);
                        navigate('/account');
                    }
                }
            })
            .catch(error => {
                console.error('Error registering user!', error);
            })
    }

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
            <h1 className="header">Create Account</h1>
            <form className="createUserForm" onSubmit = {(event) => {
                event.preventDefault();
                registerUser();
                clearForm(); }}>
                <div className="leftRegister">
                    <div>
                        First Name: <input type="text" placeholder="John" onChange={event => setFirstname(event.target.value)} value={firstname} required/>
                    </div>
                    <div>
                        Last Name: <input type="text" placeholder="Doe" onChange={event => setLastname(event.target.value)} value={lastname} required/>
                    </div>
                    <div>
                        Email: <input type="email" placeholder="JohnDoe@email.com" onChange={event => setEmail(event.target.value)} value={email} required/>
                    </div>
                    <div>
                        Address: <input type="text" placeholder="123 John Street" onChange={event => setAddress(event.target.value)} value={address} />
                    </div>
                </div>
                <div className="rightRegister">
                    <div>
                        Username: <input type="text" placeholder="JohnDoe1" onChange={event => setUsername(event.target.value)} value={username} requiredrequired/>
                    </div>
                    <div>
                        Password: <input type="current-password" placeholder="JohnsPassword" onChange={event => setPassword(event.target.value)} value={password} />
                    </div>
                    <div>
                        Confirm Password: <input type="new-password" placeholder="JohnsPassword" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} required/>
                    </div>
                    <button type="submit" className="submit"> Submit </button> 
                </div>
            </form>
                                        
        </>
    )
}

export default Register;