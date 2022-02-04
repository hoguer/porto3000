import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const fetchUser = async () => {
        try {
            const response = await axios.post('api/login');
            console.log(response.data)
            const result = response.data
            console.log(result)
            setUser(result);
        } catch (error) {
            console.log("Trouble logging in!", error)
        }
    }

    useEffect(fetchUser, []);
    const clearForm = () => {
        setUsername("");
        setPassword("");
        
};

    return (<>
    <h1>Login</h1>
    <form>
    <label>Username:</label>
           <input type="text" placeholder="username" onChange={event => setUsername(event.target.value)} value={username} />
           <label>Password:</label>
           <input type="text" placeholder="password" onChange={event => setPassword(event.target.value)} value={password} />
           <button onClick={(event) => {event.fetchUser();
                                        clearForm(); }}> Submit </button>     
    </form>
    </>
    )
}

export default Login; 