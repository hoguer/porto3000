import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
=======

>>>>>>> 64790a82b0051b426def647d75c700e44c9f2fe4
const Register =({currentUser, setCurrentUser, setIsLoggedIn, token}) =>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
<<<<<<< HEAD
// if isLoggedIn, redirect to UserProfile/Home? //
=======
    const navigate = useNavigate();

    
>>>>>>> 64790a82b0051b426def647d75c700e44c9f2fe4
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
<<<<<<< HEAD
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
=======
                if (res.data.status === 'PasswordShort') {
                    alert('Password is too short. Please create a password at least eight characters long.');
                } else if (res.data.status === 'UserExists') {
                    alert('That username already exists. Please pick a different username.');
                } else {
                    setCurrentUser(res.data.user);

                    localStorage.setItem('token', res.data.token);
                    console.log(localStorage.getItem('token'));

                    if (res.data.user) {
                        setIsLoggedIn(true);
                        navigate('/account');
                    }
                }
            })
            .catch(error => {
                console.error('Error registering user!', error);
            })
    }

>>>>>>> 64790a82b0051b426def647d75c700e44c9f2fe4
    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
<<<<<<< HEAD
};
return (
    <>
    <h2 className="createUserHeader">Create Account</h2>
    <form className="createUserForm">
        <label>First Name:</label>
            <input type="text" placeholder="Name" onChange={event => setFirstname(event.target.value)} value={firstname} required/>
        <label>Last Name:</label>
            <input type="text" placeholder="Last Name" onChange={event => setLastname(event.target.value)} value={lastname} required/>
        <label>Email Address:</label>
            <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)} value={email} required/>
        <label>Username:</label>
            <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} required/>
        <label>Password:</label>
            <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} required/>
        <label>Confirm Password:</label>
            <input type="password" placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} required/>
        <label>Street Address:</label>
            <input type="text" placeholder="Street Address" onChange={event => setAddress(event.target.value)} value={address} required/>
    </form>
        <button onClick={(event) => {
            event.preventDefault();
            registerUser();
            clearForm(); }
            }> Submit </button>                                
    </>
)
}
=======
    };

    return (
        <>
            <h2 className="createUserHeader">Create Account</h2>
            <form className="createUserForm" onSubmit = {(event) => {event.preventDefault();
                                                registerUser();
                                                clearForm(); }}>
                <label>First Name:</label>
                <input type="text" placeholder="Name" onChange={event => setFirstname(event.target.value)} value={firstname} required/>
                <label>Last Name:</label>
                <input type="text" placeholder="Last Name" onChange={event => setLastname(event.target.value)} value={lastname} required/>
                <label>Email Address:</label>
                <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)} value={email} required/>
                <label>Username:</label>
                <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} value={username} requiredrequired/>
                <label>Password:</label>
                <input type="current-password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
                <label>Confirm Password:</label>
                <input type="new-password" placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} required/>
                <label>Street Address:</label>
                <input type="text" placeholder="Street Address" onChange={event => setAddress(event.target.value)} value={address} />
                <button type="submit"> Submit </button> 
            </form>
                                        
        </>
    )
}

>>>>>>> 64790a82b0051b426def647d75c700e44c9f2fe4
export default Register;