const productsRouter = require("express").Router();
const { getProductById, getAllProducts, createProduct, getProductByName } = require("../db")
//get all products   
productsRouter.get("/", async (req, res, next) =>{
    console.log("Got here!")
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts)
    } catch (error) {
        throw error
    }
});

//get product by id 
productsRouter.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.send(product)
    } catch (error) {
        throw error
    }
});
//create new product
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
productsRouter.use((error, req, res, next) => {
    res.send(error);
});
  
module.exports = productsRouter
