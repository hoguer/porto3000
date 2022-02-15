import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import mainLogo from "../images/mainLogo.png"
import "./Cart.css"

const Cart = ({currentUser, isLoggedIn, token}) => {
    const [cart, setCart] = useState([]);
    console.log (cart)
    const fetchOrderProduct = async () => {
        let userId = currentUser.id;
        const orderProduct = await axios.get("/api/orders/cart", 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
        setCart(orderProduct.data)
        console.log(orderProduct.data)
    };
    useEffect(fetchOrderProduct, []);

    const checkoutHandler = {
        
    }

return (<>
        <div>
            
            { cart && cart.products && cart.products.length ?  
                cart.products.map(product => {
                return <>
                <div className="cartContainer">
                    <div className="innerCartContainer">
                        <h1 className="cartHeader">Cart.</h1>
                        <div className="itemDetails">
                            <div>
                                {product.name} .......... qty: {product.quantity}   
                            </div>
                        </div>
                        <button className="checkout">Checkout</button>
                    </div>
                </div>
                
                
                
                </>
            }) : null } 
        </div>
</>)
}

export default Cart;