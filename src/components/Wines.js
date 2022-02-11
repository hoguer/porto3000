import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Products.css"

const Wines = ({products, setProducts}) => {


    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            console.log(response.data)
            const result = response.data
            console.log(result)
            setProducts(result);
        } catch (error) {
            console.log("Trouble gathering products!", error)
        }
    }

    useEffect(fetchProducts, []); 
    

    return <>
    <div className="outerContainerAll">
        <div className="productsNav">
            <NavLink to="/products">All Products</NavLink> |
            <NavLink to="/products/wines">Wines</NavLink> |
            <NavLink to="/products/cheeses">Cheeses</NavLink> |
            <NavLink to="/products/productpairs">Pairings</NavLink>
        </div>
        <div className="productCardContainerAll">
            <div className="productCardAll">
                {
                    products.map((product)=> {
                        if(product.category === "wine"){
                            return (
                                <>
                                    <div key={product.id}>
                                        <div className="cardContentContainer">
                                            <div className="cardName">
                                                {product.name}
                                            </div>
                                            <div className="cardImage">
                                                <img src={product.imgURL} className="productImg"></img>
                                            </div>
                                            <div className="itemPrice">
                                                ${product.price}
                                            </div>
                                            <div className="productButtonsContainer">
                                                <NavLink to={`/products/${product.id}`} className="productsButton">View Product</NavLink>
                                                <button className="productsButton">Add to Cart</button>
                                            </div>
                                
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    })
                }
            </div>
        </div>
    </div>
    
    </>
}

export default Wines; 