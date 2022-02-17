import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css"

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchOrderProduct = async () => {
        const orderProduct = await axios.get(
            "/api/orders/cart", 
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        )
        setCart(orderProduct.data)
        console.log(orderProduct.data)
    };
    useEffect(fetchOrderProduct, []);

    const checkout = async () => {
        const result = await axios.post(
            "/api/payments/create-checkout-session", 
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        );
        window.location.href = result.data.url;
    }

    const paymentAlert = (event) => {
        alert("Your payment is now being processed. Thank you for your order. A confirmation email with tracking information will be sent to you shortly.")
    }
    
    return (<>
        <div>
            { cart && cart.products && cart.products.length ?  
                cart.products.map((product, idx) => {
                return <div key={idx} className="cartContainer">
                    <div className="innerCartContainer">
                        <h1 className="cartHeader">Cart.</h1>
                        <div className="itemDetails">
                            <div>
                                {product.name} .......... qty: {product.quantity}   
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={checkout} className="checkout">Checkout</button>
                    </div>
                </div>
            }) : null } 
        </div>
    </>)
}

export default Cart;