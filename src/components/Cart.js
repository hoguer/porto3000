import React, { useEffect, useState } from "react";

import axios from "axios";
import "./Cart.css"
import { useNavigate } from "react-router-dom";


const Cart = ({currentUser, isLoggedIn, token}) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate()

    const fetchOrderProduct = async () => {
        const orderProduct = await axios.get("/api/orders/cart", 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
        setCart(orderProduct.data)
        console.log(orderProduct.data)
    };
    useEffect(fetchOrderProduct, []);

    const paymentAlert = (event) => {
        alert("Your payment is now being processed. Thank you for your order. A confirmation email with tracking information will be sent to you shortly.")
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
                    </div>
                    <div>
                        <form className="cardDetails" onSubmit={(event)=>{
                            paymentAlert(); 
                            navigate("/")}
                        }>
                            <p>Credit Card</p>
                            <input className="cardInput" type="text" placeholder="name on credit card" required/>
                            <input className="cardInput" type="text" placeholder="ZIP" required/>
                            <input className="cardInput" type="text" pattern="[0-9]{16}" placeholder="1111-2222-3333-4444" required/>
                            <input className="cardInput" type="text" placeholder="exp 02/25" required/>
                            <input className="cardInput" type="text" placeholder="CVV" required/>
                            <button type="submit" className="checkout">Checkout</button>
                        </form>
                    </div>
                </div>
                </>
            }) : null } 
        </div>
</>)
}

export default Cart;