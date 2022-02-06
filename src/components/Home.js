import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"
import img1 from "../images/wineGlasses.jpeg"
import featImg1 from "../images/goatCheese.jpg"
import featImg2 from "../images/wineBottle.jpg"
import featImg3 from "../images/Oscypki.jpg"
import mainLogo from "../images/mainLogo.png"

const Home = () => {
    return <>
      <div className="componentContainerHome">
        <div className="featuredContainer">
            <img src={img1} className="img1"/>
        </div>
        <div className="featured">
            <div>
                <h1>Featured Products</h1>
            </div>
            <div className="fpCards">
                <div className="fp">
                    <NavLink to="/products/25"><img src={featImg1} className="featImg"/></NavLink>
                    <p>Goat Cheese</p>
                </div>
                <div className="fp">
                    <NavLink to="/products/1"><img src={featImg2} className="featImg"/></NavLink>
                    <p>Port Wine</p>
                </div>
                <div className="fp">
                    <NavLink to="/products/40"><img src={featImg3} className="featImg"/></NavLink> 
                    <p>Oscypki</p>
                </div>
            </div>
        </div>
      </div>
    </>
}

export default Home;