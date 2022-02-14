import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import mainLogo from "../images/mainLogo.png"
import "./SingleProduct.css"

const SingleProduct = ({products, setProducts, currentUser, token}) => { 
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    let { id } = useParams();
    id = parseInt(id)
    console.log(products)
    console.log(typeof id)
    
    // place this code into a useEffect() to prevent reloading
    // If products is empty, call our API /products/:id to get the product
    // else do products.find
    const retrieveProduct = async () => {
        let singleProduct;
        if (products.length === 0){
            console.log("in here")
            try {
                const response = await axios.get(`/api/products/${id}`);
                singleProduct = response.data;
                console.log('response', response)
                console.log("single product", singleProduct)                
            } catch (error) {
                
            }
        } else {
            singleProduct = products.find(product => product.id === Number(id))
        }
        setProduct(singleProduct)
    }
    useEffect(retrieveProduct, [])

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

    const handleDestroyProduct = async (token, productId) => {
        console.log("in HandleDestoryProducts")
        axios.delete("/api/products/:id", {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            console.log(res)
            navigate("/products")
            const remainingProducts = products.filter((product) => productId !== product.id)
            setProducts(remainingProducts)
        })
    }

    const handleUpdateProduct = async (token, productId) => {
        console.log("Handle Update Product")
        // axios.patch("/api/products/:id", 
        // )
    }

    return ( 
        <>   
        { product ? 
        <div key={product.id}>
            <div className="productsNav">
                <NavLink to="/products">All Products</NavLink> |
                <NavLink to="/products/wines">Wines</NavLink> |
                <NavLink to="/products/cheeses">Cheeses</NavLink> |
                <NavLink to="/products/productpairs">Pairings</NavLink>
            </div>
            <div className="productContainer">
                <div className="productCard">
                    <div className="singleCardContent">    
                        <div className="innerCard">
                            <div className="productContainer">
                                <img src={product.imgURL} className="productImage"/>
                            </div>
                        </div>
                        <div className="cardDetails">
                            <div className="productName">
                                <h2>{product.name}</h2>
                            </div>
                            <div className="productPrice">
                                <b>${product.price}</b>
                            </div>
                            <div className="productDescription">
                                <i>{product.description}</i>
                            </div>
                                <div className="singleProdButtonContainer">
                                    <button className="productsButton" onClick={() => {addToCart("created", currentUser.id)}}>Add to Cart</button>
                                    <NavLink to="/products" className="productsButton returnToAllProducts">Return to All Products</NavLink>
                                    {
                                        currentUser.isAdmin ?
                                        <>
                                        { <button className="productsButton adminButton" onClick={() => handleDestroyProduct(token, product.id)}>Delete</button>}
                                        { <button className="productsButton adminButton" onClick={() => handleUpdateProduct(token, product.id)}>Update</button>}
                                        </>
                                        : null
                                    }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null
    
        }    
        <div className="sealContainer">
            <img src={mainLogo} className="portoSeal"/>
            <div className="sealDescription">
                <p>Each product is backed by the Porto 3000 seal of quality assurance. From the care of our crops and livestock to the finest details on our packaging, the entire process is monitored to ensure the finest product is produced.</p>
                <p>We go the extra mile because we love you 3000. </p>
            </div>
        </div>
        </>
    )
}

export default SingleProduct;