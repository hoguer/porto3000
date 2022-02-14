import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Cart.css"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

const CLIENT_SECRET = process.env
// import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(CLIENT_SECRET)

const Cart = (currentUser, CheckoutForm) => {
    console.log(currentUser)
    const id = currentUser.currentUser.id
    console.log(id)
    if(currentUser) {
        console.log("hello")
        axios.get("api/orders/cart", {
            params: { id },
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
          })
          .then(res => {
              console.log("I'm here now!", res)
          })
    }

    const options = {
        // passing the client secret obtained from the server
        //this is from the documentation^
        clientSecret: CLIENT_SECRET,
      };
    return <>
    <h1 className="header">Cart</h1>
    <Elements stripe={stripePromise} options={options}>
      {/* <CheckoutForm /> */}
    </Elements>
    </> 
}
export default Cart; 