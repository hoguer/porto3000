const apiRouter = require('express').Router();
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter)

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter)

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter)


const paymentsRouter = require("./payments");
apiRouter.use("/payments", paymentsRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;
