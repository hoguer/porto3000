import React, { useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Products.css"

const Products = ({products, setProducts}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const productType = searchParams.get("type") || ''
    console.log(productType)

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
    <div className="outerContainerAll">
        <div className="productsNav">
            <NavLink to="/products">All Products</NavLink> |
            <NavLink to="/products?type=wine">Wines</NavLink> |
            <NavLink to="/products?type=cheese">Cheeses</NavLink> |
            <NavLink to="/products?type=wine%20and%20cheese">Pairings</NavLink>
        </div>
        <div className="productCardContainerAll">
            <div className="productCardAll">
                {
                    products.map((product)=> {
                        if(!productType || product.category === productType){
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

export default Products;