import React from "react";
import "./HomeAgeVer.css"
import mainLogo from "../images/mainLogo.png"
import welcome from "../images/welcome.png"
import { NavLink } from "react-router-dom";
const HomeAgeVerification = () => {
    return <>
      <div className="componentContainer">
        <img src={mainLogo} className="img1"/>
        <div className="ageVerContent">
          <h1>Welcome,</h1>
          <div className="details">
            <p className="line1">This website contains content that requires our guests to be 21+.</p>
            <p className="line2">Please verify your age to help ensure the safety of our guests</p>
          </div>
          <div className="buttonContainer21">
            <NavLink to="/Home" className="yesButton">Yes, I am 21+</NavLink>
            <NavLink to="/" className="noButton">No, I am not of age</NavLink>
          </div>
        </div>
      </div>
    </>
}

export default HomeAgeVerification; 