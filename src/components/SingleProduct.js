import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css"

const SingleProduct = ({products, setProducts}) => { 
    const [product, setProduct] = useState({});
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

    return ( 
        <>   
        { product ? 
        <div key={product.id}>
            <div className="productContainer">
                <div className="productCard">
                    <div className="productName">
                        {product.name}
                    </div>
                    <div className="cardContent">    
                        <div className="innerCard">
                            <div className="productContainer">
                                <img src={product.imgURL} className="productImage"/>
                            </div>
                        </div>
                        <div className="cardDetails">
                            <div className="productPrice">
                                ${product.price}
                            </div>
                            <div className="productDescription">
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null
    
        }    
        </>
    )
}

export default SingleProduct;