import React from "react";
import { useParams } from "react-router-dom";

const SingleProduct = ({products, token}) => { 
    const { id } = useParams();
    console.log(products)
    return (        
        // <div>Hello</div>
        products.map((product)=> {
            console.log('useParams id',id)
            if (id === product.id) {
                return (
                    <>
                        <div>Hello</div>
                        <div key={product.id}>
                            {product.name}
                            {product.description}
                            {product.price}
                        </div>
                    </>
                )
            }
        })
    )
}

export default SingleProduct;