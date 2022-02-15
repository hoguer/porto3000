
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = ({products, setProducts, currentUser, token}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [cart, setCart] = useState({})
    const navigate = useNavigate();
    const searchTerm = searchParams.get("searchTerm");
    const productType = searchParams.get("type") || ''

    const fetchProducts = async () => {
        try {
            const response = await axios.get('api/products');
            const result = response.data
            setProducts(result);
        } catch (error) {
            throw(error)
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

    useEffect(async()=>{
        if(token){
            const currentCart = await axios.get("/api/orders/cart",
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            setCart(currentCart)
        }
    }, [])
// pass in orderId
    const addToCart = async (status, product) => {
        // if there is a cart present (req. orderId and status: created) then make an axios call to orders/:orderId/products
        // if there is not a cart then make a post. api/orders/
        // add state to setCart
        let newOrder; 
        console.log(Object.keys(cart).length)
        const productId = product.id
        const price = product.price

        if(!cart || Object.keys(cart).length === 0){
            try {
                const result = await axios.post("/api/orders", {status}, 
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })
                newOrder = result.data.newOrder
                setCart(newOrder)
            } catch (error) {
                throw error
            }
        } 
        console.log ("in here")
        console.log("cart", cart)
        const currentOrder = await axios.post(`/api/orders/${(cart.id || newOrder.id)}/products`, {productId, price, quantity:1})
        console.log ("cartId", cart.id)
        console.log ("newOrderId", newOrder.id)
        console.log("currentOrder", currentOrder)
        setCart(currentOrder)
        navigate("/cart")
    };

    const handleDestroyProduct = async (token, productId) => {
        axios.delete("/api/products/:id", {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            console.log(res)
            const remainingProducts = products.filter((product) => productId !== product.id)
            setProducts(remainingProducts)
        })
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
                                                <NavLink to={`/products/${product.id}`} className="allProductsButton">View Product</NavLink>
                                                <button className="allProductsButton" onClick={() => {addToCart("created", product)}}>Add to Cart</button>
                                                { 
                                                    currentUser.isAdmin ?
                                                        <>
                                                            { <button className="productsButton_adminButton" onClick={() => handleDestroyProduct(token, product.id)}>Delete</button>}
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