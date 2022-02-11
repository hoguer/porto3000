const orderProductsRouter = require("express").Router();
const { getOrderProductsById, addProductToOrder, updateOrderProduct, destroyOrderProduct} = require("../db")
// const { isLoggedIn, isAdmin } = require("./util") need?


orderProductsRouter.post("/products", async (req, res, next) => {
    const { orderId, productId } = req.body;
    try {
        const order_products = await getOrderProductsById({status, userId})
        res.send({
            id: orderId,
            name: "Order",
            message: "Your order has been made"
        }, order_products)
    } catch(error) {
        throw error;
    };
});

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
    const { orderId} = req.params;
    const { orderId, productId, price, quantity } = req.body;
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
    const { orderId, productId, price, quantity } = req.body;
    try {
        const destroyedOrderProduct = await destroyOrderProduct({orderId, productId, price, quantity})
        res.send({
            name: "ProductDeleted",
            message: "That product is noe removed"
        }, [destroyedOrderProduct]);
    } catch (error) {
        throw error;
    };
});

module.exports = orderProductsRouter;