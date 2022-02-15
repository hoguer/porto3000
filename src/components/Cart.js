import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import mainLogo from "../images/mainLogo.png"
import "./SingleOrder.css"

const Cart = ({currentUser, isLoggedIn, token}) => {
    const [cart, setCart] = useState([]);

    const fetchOrderProduct = async () => {
        let userId = currentUser.id;
        const orderProduct = await axios.get("/api/orders/cart", 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
        setCart(orderProduct)
    };
    useEffect(fetchOrderProduct, []);

return (<>
        <div className="sealContainer">
            <img src={mainLogo} className="portoSeal" alt="porto quality seal"/>
            <div className="sealDescription">
                <p>Each product is backed by the Porto 3000 seal of quality assurance. From the care of our crops and livestock to the finest details on our packaging, the entire process is monitored to ensure the finest product is produced.</p>
                <p>We go the extra mile because we love you 3000. </p>
            </div>
        </div>
</>)
}

export default Cart;

