import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleProduct = ({products}) => {

return (
    products.map((product)=> {
        if (productId === product.id)
        return (
            <div key={product.id}>
                {/* <div><SendMessage token={token}/></div> */}
                <div  className='product'> </div>
                <div className='name'><b>{product.name}</b></div> 
                <div className='category'><b>{product.category}</b></div>
                    <div className='inStock'>
                        <b>(In Stock:) </b> {product.inStock ? 'Yes' : 'No'}
                    </div>
                <div>
                    <img src={product.imgURL} alt = "productImage"/>
                </div>
                <div className='price'><b>Price: {product.price}</b></div>
                <div className='description'><b>Item Description:{product.description}</b></div>
                </div>
        )
    })
)
}
export default SingleProduct;