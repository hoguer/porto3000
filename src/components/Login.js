import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./LoginRegister.css"

const Login = ({currentUser, setCurrentUser, setIsLoggedIn, token}) => {
    console.log('In login user!');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = () => {

        if (!username || !password) {
        return;
    }
    console.log('Login User is being called!');
     axios.post('/api/users/login', { username, password })
        .then(res => {
            console.log('Loggedin User: ', res);

            if (res.data.status === 'UsernamePasswordIncorrect') {
                return alert('Username or passord incorrect. Please re-enter credentials.');
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
            console.error('Error logging-in user!', error);
        })
    }

    const clearForm = () => {
            setUsername("");
            setPassword("");
    };
    

    return (
    <>
        <h1 className="header">Login</h1>
        <form onSubmit={(event) => {event.preventDefault();
            loginUser();
            clearForm(); }}>
                <div className="loginForm">
                    <input type="text" placeholder="username" onChange={event => setUsername(event.target.value)} value={username} />
                    <input type="password" placeholder="password" onChange={event => setPassword(event.target.value)} value={password} />
                    <button type="submit" className="submit"> Submit </button>  
                </div>   
        </form>
    </>
)
}


export default Login; 