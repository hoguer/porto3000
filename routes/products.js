const productsRouter = require("express").Router();
const { getProductById, getAllProducts, createProduct, getProductByName } = require("../db")
//get all products   
productsRouter.get("/", async (req, res, next) =>{
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
  
module.exports = productsRouter;