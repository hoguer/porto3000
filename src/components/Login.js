import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./LoginRegister.css"

const Login = ({currentUser, setCurrentUser, setIsLoggedIn, token}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showCredentialsError, setShowCredentialsError] = useState(false);
    const [loginError, setLoginError] = useState("");
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
                setCurrentUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem('token'));
                if (res.data.user) {
                    setShowCredentialsError(false);
                    setIsLoggedIn(true);
                    navigate('/account');
                }

            }
        })
        .catch(error => {
            console.error('Error logging-in user!', error);
            const errorMessage = "login" ? "Incorrect username and password combination." : "Username already taken."
            console.log("here!")
            setLoginError(errorMessage);
            setShowCredentialsError(true);
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
                <div>
                    { showCredentialsError ? <div className="error">{loginError}</div> : null }
                    <button type="submit" className="submit"> Submit </button>  
                </div>
                </div>   
        </form>
    </>
)
}


export default Login; 