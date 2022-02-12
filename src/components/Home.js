import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"
import img1 from "../images/handHeldGrapes.png"
import featImg1 from "../images/goatCheese.jpg"
import featImg2 from "../images/wineBottle.jpg"
import featImg3 from "../images/Oscypki.jpg"

const Home = () => {
    return <>
    <h1 className="slogan">Let us be your new Local Host</h1>
      <div className="componentContainerHome">
        <div className="featuredContainer">
            <img src={img1} className="img1"/>
        </div>
        <div className="featuredContainerRight">
            <div className="featured">
                <div className="featHeader">
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
                <div className="featContainerParagraph">
                    <div>
                        <p>Welcome to Porto 3000. Our goal is to deliver the finest wines and cheeses to your familia's table. We believe that wine and cheese are a wonderful pairing, but we also believe that it can foster great experiences between new aquaintances and loved ones. The ingredients used to make our products are ethically sourced and USDA organic certified. Additionally, an ideal that we hold near and dear to our hearts is that all of our ingredients must be sourced locally. We love to support our friends and neighbors along their business journies so that we can grow and succeed as a community. May our wine bring you and your family wonderful new memories and we hope to see you soon on the vineyard. </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
}

export default Home;