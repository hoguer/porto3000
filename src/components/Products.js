import React, { useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = ({products, setProducts, currentUser, token}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const searchTerm = searchParams.get("searchTerm");
    const productType = searchParams.get("type") || ''

    const fetchProducts = async () => {
        try {
            const response = await axios.get('api/products');
            const result = response.data
            console.log(result)
            setProducts(result);
        } catch (error) {
            console.log("Trouble gathering products!", error)
        }
    }

    useEffect(fetchProducts, []); 

    const searchProducts = (product, text) => {
        text = text.toLowerCase();
        const {name} = product;
        for (const field of [name]) {
            if(field.toLowerCase().includes(text)) {
                return true;
            }
        }
    }

    const filteredProducts = searchTerm ? products.filter(product => searchProducts(product, searchTerm)) : products;

    const addToCart = (status, userId) => {
        console.log(currentUser)
        console.log("Add to Cart was pushed");
        axios.post("/api/orders", {status, userId})
            .then(res => { 
                console.log("Adding item to order", res)
                console.log("userId", userId)
                console.log("status", status)
                navigate("/cart")
            })
    };

    const handleDeleteProducts = (token, productId) => {
        console.log("in HandleDelete")
        // await handleDeleteProducts(token, productId)
        // const remainingProducts = products.filter((product) => productId !== product.id)
        // setProducts(remainingProducts)
    }

    return <>
    <div className="outerContainerAll">
        <div className="productsNav">
            <NavLink to="/products">All Products</NavLink> |
            <NavLink to="/products?type=wine">Wines</NavLink> |
            <NavLink to="/products?type=cheese">Cheeses</NavLink> |
            <NavLink to="/products?type=wine%20and%20cheese">Pairings</NavLink>
            <input className="searchbar" type="text" name="search" placeholder="Search Products" value={searchTerm || ""} onChange={(event) => {
                    setSearchParams({searchTerm:event.target.value})
                }}/>
        </div>
        <div className="productCardContainerAll">
            <div className="productCardAll">
                { filteredProducts && filteredProducts.length ? 
                    filteredProducts.map((product) => { 
                        if(!productType || product.category === productType){
                            return (
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
                                                <button className="productsButton" onClick={() => {addToCart("created", currentUser.id)}}>Add to Cart</button>
                                                { 
                                                    currentUser.isAdmin ?
                                                        <>
                                                            { <button className="productsButton adminButton" onClick={() => handleDeleteProducts(token, product.id)}>Delete</button>}
                                                            { <button className="productsButton adminButton">Update</button>}
                                                        </>
                                                    :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
                    })
                    : null
                }
            </div>
        </div>
    </div>
    
    </>
}

export default Products;