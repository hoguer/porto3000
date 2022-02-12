const orderProductsRouter = require("express").Router();
const { getOrderProductsById, addProductToOrder, updateOrderProduct, destroyOrderProduct} = require("../db")
// const { isLoggedIn, isAdmin } = require("./util") need?


orderProductsRouter.post("/orders/:orderId/products",  async (req, res, next) => {
    const orderId = req.params.orderId
    const { orderId, productId, price, quantity } = req.body;
    try {
        const order_product = await addProductToOrder(orderId, productId, price, quantity)
        res.send({
            name: "Select item",
            message: "Your item is added to cart"
        }, order_product)
    } catch(error) {
        throw error;
    };
});

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
        const updatedOrderProducts = await updateOrderProduct({ orderId, productId, price, quantity })
        res.send({
            name: "OrderUpdate",
            message: "The order has been updated"
        }, [updatedOrderProducts]);
    } catch (error) {
        throw error;
    };
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
        const destroyedOrderProduct = await destroyOrderProduct({orderId, productId, price, quantity})
        res.send({
            name: "ProductDeleted",
            message: "That product is now removed"
        }, [destroyedOrderProduct]);
    } catch (error) {
        throw error;
    };
});

module.exports = orderProductsRouter;