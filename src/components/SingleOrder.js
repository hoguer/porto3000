import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import mainLogo from "../images/mainLogo.png"
import "./SingleOrder.css"

const Cart = ({currentUser}) => {
const [orderProduct, setOrderProducts] = useState([]);

const fetchOrderProduct = () => {
    let userId = currentUser.id;
    const orderProduct = axios.get("/api/orders/cart", {userId})
            .then(res => { 
                console.log(res)
            });
        };

return (<>
    <div className="outerContainerAll">
    <div className="productsNav">
        <NavLink to="/products">All Products</NavLink> |
        <NavLink to="/products?type=wine">Wines</NavLink> |
        <NavLink to="/products?type=cheese">Cheeses</NavLink> |
        <NavLink to="/products?type=wine%20and%20cheese">Pairings</NavLink>
        </div>
    <div classname="devWarningNav">
   <p>Still in dev</p> 
   </div>
        {/* {orderProduct.map(product => {
            return ( <>
                <div key={product.id}>
                    <div className="productContainer">
                        <div className="productCard">
                            <div className="singleCardContent">    
                                <div className="innerCard">
                                    <div className="productContainer">
                                        <img src={"nothing.com"} className="productImage"/>
                                    <div className="cardDetails">
                                        <div className="productName">
                                            <h2>{product.name}</h2>
                                        </div>
                                        <div className="productPrice">
                                            <b>${product.quanity}</b>
                                        </div>
                                        <div className="productDescription">
                                            <i>{product.description}</i>
                                        </div>
                                        <div className="productDescription">
                                            <i>{product.price}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)})} */}
        <div className="sealContainer">
            <img src={mainLogo} className="portoSeal" alt="logo image"/>
            <div className="sealDescription">
                <p>Each product is backed by the Porto 3000 seal of quality assurance. From the care of our crops and livestock to the finest details on our packaging, the entire process is monitored to ensure the finest product is produced.</p>
                <p>We go the extra mile because we love you 3000. </p>
            </div>
        </div>
    </div>
     </>)
}

export default Cart;
