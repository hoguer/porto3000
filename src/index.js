import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom"
import {
  App
} from './components';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("App")
);