import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./NewProduct.css"

const NewProduct = ({currentUser}) => {
  const blankProduct = {name: "", description: "", price: "", imgURL: "", inStock: true, category: ""};
  const [product, setProduct] = useState(blankProduct);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showProductError, setShowProductError] = useState(false);
  const [createError, setCreateError] = useState("");
  const navigate = useNavigate();

  const createProduct = async (event) => {
    if ( !product.name || !product.description || !product.price || !product.inStock|| !product.category ) {
      return;
    }
    try {
      event.preventDefault();
      let result = await axios.post("/api/products", JSON.stringify(product), { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }})
      navigate("/products")
    } catch (error) {
      console.error("Error creating new product!", error);
      const errorMessage = "error" && "Product cannot be created at this time."
      setCreateError(errorMessage);
      setShowProductError(true);
    }
  }

  return <>
    <h1 className="header">Create a Product!</h1>
    <form className="createProductForm" onSubmit={createProduct}>
      <p>Product Name</p>
      <input type="text" name="name" value={product.name} placeholder="Mangoscato" minLength="1" required onChange={(event) => {
        setProduct({...product, name: event.target.value})
      }}></input>
      <p>Product Description</p>
      <input type="text" name="description" value={product.description} placeholder="Earl Stevens Selection" minLength="1" required onChange={(event) => {
        setProduct({...product, description: event.target.value})
      }}></input>
      <p>Product Price</p>
      <input type="number" name="price" value={product.price} placeholder="$25" minLength="1" required onChange={(event) => {
        setProduct({...product, price: event.target.valueAsNumber})
      }}></input>
      <p>Product Image</p>
      <input type="url" name="imgURL" value={product.imgURL} placeholder="https://image.jpg" alt="product image" minLength="1" required onChange={(event) => {
        setProduct({...product, imgURL: event.target.value})
      }}></input>
      <p>Is the product in stock? </p>
      <input type="checkbox" name="inStock" value={product.inStock} placeholder="Check yes for in stock" required onChange={(event) => {
        setProduct({...product, inStock: event.target.checked})
      }}></input>
      <p>Select a product category</p>
      <div>
        <select name="category" value={product.category} placeholder="Select a category" required onChange={(event) => {
          const selectedOption = event.target.value;
          setProduct({...product, category: event.target.value})
        }}>
          <option>Please select an option</option>
          <option value="wine">wine</option>
          <option value="cheese">cheese</option>
          <option value="wine and cheese">wine and cheese</option>
          </select>
      </div>
      <br />
      <button type="submit">Create new product</button>
    </form>
  </>
}

export default NewProduct;