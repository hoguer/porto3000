import React, { useEffect, useState } from "react";
import axios from "axios";

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

    // useEffect(fetchProducts, []); 
    fetchProducts()

    return <>
    <h1>Products</h1>
    </>
}

export default Products; 