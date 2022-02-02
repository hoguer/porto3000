import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css"

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('api/products');
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
    <h1 className="productHeader">Our Wines and Cheeses</h1>
    <div className="productCardContainer">
        <div className="productCard">
            {
                products.map((product)=> {
                    return (
                        <>
                            <div key={product.id}>
                                <div className="cardContentContainer">
                                    <div className="cardContent">
                                        {product.name}
                                        <img src={product.imgURL} className="productImg"></img>
                                    </div>
                                    <div className="itemPrice">
                                        ${product.price}
                                    </div>
                                    <div className="productButtonsContainer">
                                        <button className="vProdButton" >View Product</button>
                                        <button className="addToCartButton">Add to Cart</button>
                                    </div>
                        
                                </div>
                                
                                
                                
                                {/* name, img, price, buttons x2 */}
                                {/* button1: add to cart (possibly with +/- or an input field for how many desired) */}
                                {/* button2: to single card view */}
                            </div>
                        </>
                    )
                })
            }
        </div>
    </div>
    
    </>
}

export default Products; 