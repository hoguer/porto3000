import React, { useState, useEffect } from "react";
import axios from "axios";
// import getSomething from "../api" 

//axios is throwing me off, not sure how to fetch from backend- haaalp :/

const Products= ({currentUser, token}) =>{
const [product, setProduct]= useState({});

 useEffect(() => {
     try{
         axios.get(`/products`)
         .then (res =>{
             const {data: product} = res;
             console.log(product);
             setProduct(product)
         })
     } catch (error){
         throw error;
     }
 }, []);

 //OR const fetchAllProducts = async (token) => {
//     const products = await getSomething({
//         url: '/products',
//         method: 'GET',
//         token,
//     });
//     return products;
// };

return (
<>
<h1> Our Products</h1>

</>

)



}

export default Products;