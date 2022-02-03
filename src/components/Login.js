import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState([]);

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

    return (<>
    <h1>Login</h1>
    <form>
        <input type="text" placeholder="Username">Username</input>
        <input type="text" placeholder="Password">Password</input>
        <button>Log In </button>
    </form>
    </>
    )
}

export default Login; 