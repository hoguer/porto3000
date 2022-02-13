const orderProductsRouter = require("express").Router();
const { getOrderProductsById, addProductToOrder, updateOrderProduct, destroyOrderProduct} = require("../db")
// const { isLoggedIn, isAdmin } = require("./util") need?


orderProductsRouter.post("/orders/:orderId/products",  async (req, res, next) => {
<<<<<<< HEAD
    const orderId = req.params.orderId
    const { productId, price, quantity, userId } = req.body;
=======
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
>>>>>>> 4033a738e3ce5f6dc34e9736f90d159600b9d2de
    try {
        const order_product = await addProductToOrder(orderId, productId, price, quantity)
        res.send({
            name: "Select item",
<<<<<<< HEAD
            message: "Your item is added to cart"
=======
            message: "Your item is added to cart."
>>>>>>> 4033a738e3ce5f6dc34e9736f90d159600b9d2de
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
<<<<<<< HEAD
            name: "OrderUpdate",
            message: "The order has been updated"
=======
            name: "Order Update",
            message: "The order has been updated."
>>>>>>> 4033a738e3ce5f6dc34e9736f90d159600b9d2de
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
<<<<<<< HEAD
            name: "ProductDeleted",
            message: "That product is now removed"
=======
            name: "Product Deleted",
            message: "That product is now removed."
>>>>>>> 4033a738e3ce5f6dc34e9736f90d159600b9d2de
        }, [destroyedOrderProduct]);
    } catch (error) {
        throw error;
    };
});

module.exports = orderProductsRouter;