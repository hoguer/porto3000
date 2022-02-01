const apiRouter = require('express').Router();
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter)

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter)

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!"
//   });
// });

module.exports = apiRouter;
