import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Cart.css"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KRX5lDiPmSSqdKeLFGXnGTrTTwdg9wDvM4dUELHFXcKTcEz6SABvgnK88uzmsVVpQVgbvJgEevcHQPB7JJ6O4tz00aUxs4kpL')

const CartCheckout = (CheckoutForm) => {
//^ will fix 
    const options = {
        // passing the client secret obtained from the server
        //this is from the documentation^
        clientSecret: '{{CLIENT_SECRET}}',
      };

    return <>

    <h1 className="header">Cart</h1>
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
    </>
}

export default CartCheckout; 