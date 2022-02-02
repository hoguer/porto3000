const ordersRouter = require("express").Router();
const { getOrderById, getAllOrders, getOrdersByUser, getOrdersByProduct, getCartByUser, createOrder} = require("../db");
const { isLoggedIn, isAdmin } = require("./util")

ordersRouter.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.send(allOrders);
    } catch (error) {
        throw error;
    };
});

ordersRouter.get("/cart", isLoggedIn, async (req, res, next) => {
    try {
        const userCart = await getCartByUser();
        res.send(userCart)
    } catch(error) {
        throw error;
    };
});

ordersRouter.post("/", isLoggedIn, async (req, res, next) => {
    const { status, userId } = req.body;
    try {
        const newOrder = await createOrder({status, userId})
        res.send({
            name: "OrderCreated",
            message: "Your order has been made"
        }, newOrder)
    } catch(error) {
        throw error;
    };
});

ordersRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = ordersRouter;