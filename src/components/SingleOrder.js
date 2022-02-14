import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./SingleOrder.css"
import {getOrdersByUser} from "../../"

const SingleOrder = ({id}) =>{
const orderProduct = getOrdersByUser(id)
return (<>
    <div className="productsNav">
        <NavLink to="/products">All Products</NavLink> |
        <NavLink to="/products?type=wine">Wines</NavLink> |
        <NavLink to="/products?type=cheese">Cheeses</NavLink> |
        <NavLink to="/products?type=wine%20and%20cheese">Pairings</NavLink>
        </div>
        {orderProduct.map(product => {
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
        </>)})}
     </>)
}

export default SingleOrder