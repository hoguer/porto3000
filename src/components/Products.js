import React, { useState, useEffect } from "react";
import axios from "axios";


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

//  return (
// <>




//  )



}

export default Products;