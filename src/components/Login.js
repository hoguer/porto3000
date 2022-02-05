import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = ({currentUser, setCurrentUser, setIsLoggedIn, token}) => {
    console.log('In login user!');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = () => {

        if (!username && !password) {
        return;
    }
    console.log('Login User is being called!');
     axios.post('/api/users/login', { username, password })
        .then(res => {
            console.log('Loggedin User: ', res.data);

            if (res.data.status === 'UsernamePasswordIncorrect') {
                return alert('Username or passord incorrect. Please re-enter credentials.');
            } else {

                setCurrentUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem('token'));
                if (res.data.user) {
                    setIsLoggedIn(true);
                    navigate('/');
                }

            }
        })
        .catch(error => {
            console.error('Error logging-in user!', error);
        })
    }

    const clearForm = () => {
            setUsername("");
            setPassword("");
    };
    

    return (
    <>
        <h1>Login</h1>
        <form onSubmit={(event) => {event.preventDefault();
            loginUser();
            clearForm(); }}>
            <label>Username:</label>
            <input type="text" placeholder="username" onChange={event => setUsername(event.target.value)} value={username} />
            <label>Password:</label>
            <input type="text" placeholder="password" onChange={event => setPassword(event.target.value)} value={password} />
            <button type="submit"> Submit </button>     
        </form>
    </>
)
}


export default Login; 