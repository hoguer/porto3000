const apiRouter = require('express').Router();
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter)

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter)

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter)

const orderProductsRouter = require("./orderProducts");
apiRouter.use("/", orderProductsRouter)

const paymentsRouter = require("./payments");
apiRouter.use("/payments", paymentsRouter);

apiRouter.use('*', (req, res, next) =>{
  res.status(404);
  res.send({ error: 'route not found'});
})

module.exports = apiRouter;
