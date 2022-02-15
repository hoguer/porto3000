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

    const addToCart = async (status, userId, product) => {
        await axios.post("/api/orders", {status, userId})
            .then(res => { 
                console.log(res)
                const orderId = res.data.newOrder.id;
                const productId = product.id
                const price = product.price
                const quantity = 1
                axios.post(`/api/orders/${orderId}/products`, {orderId, productId, price, quantity})
                    .then(res => {
                        navigate("/cart")
                })
            })
    };

    const handleDestroyProduct = async (token, productId) => {
        axios.delete("/api/products/:id", {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
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
                                                <img src={product.imgURL} className="productImg" alt="product image"></img>
                                            </div>
                                            <div className="itemPrice">
                                                ${product.price}
                                            </div>
                                            <div className="productButtonsContainer">
                                                <NavLink to={`/products/${product.id}`} className="allProductsButton">View Product</NavLink>
                                                <button className="allProductsButton" onClick={() => {addToCart("created", currentUser.id)}}>Add to Cart</button>
                                                { 
                                                    currentUser.isAdmin ?
                                                        <>
                                                          <div className="adminButtonsContainer">
                                                              { <button className="productsButton_adminButton" onClick={() => handleDestroyProduct(token, product.id)}>Delete</button>}
                                                          </div>
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