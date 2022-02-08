const productsRouter = require("express").Router();
const {isAdmin}= require('./util')

const { getProductById, getAllProducts, createProduct, getProductByName, patchProduct } = require("../db")
  
productsRouter.get("/", async (req, res, next) =>{
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts)
    } catch (error) {
        throw error
    }
});
 
productsRouter.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        res.send(product)
    } catch (error) {
        throw error
    }
});

//Admin
productsRouter.post("/", async (req, res, next) => {
    const { name, description, price, imgURL, inStock, category} = req.body;
    if(!name || !description || !price || !category) {
        next({ 
            name: "new product error",
            message: "Please fill in all required fields to complete entry"
        })
    }

    try {
        const newProduct = await createProduct({ name, description, price, imgURL, inStock, category})
        res.send({
            name: "new product successful",
            message: "Successfully created a new product"
        }, newProduct)
    } catch (error) {
        throw error
    }
})

//  NEW PATCH PRODUCTS
productsRouter.patch('/:id', isAdmin, async (req, res, next)=>{
    try{
        const {id} = req.params;
        const updatedProduct = await patchProduct(id, req.body);
        res.send({
            name: "success",
            message: "Product successfully updated!", 
            updatedProduct, 
        });
    } catch({name, message}){
        next({
            name: "error edit product",
            message: "Product could not be updated!",
        });
    }
});

  
module.exports = productsRouter;