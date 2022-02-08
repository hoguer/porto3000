const usersRouter = require("express").Router();
const { getAllUsers, createUser, getUserByUsername, getOrdersByUser } = require("../db");
const { isLoggedIn, isAdmin } = require("./util")
const jwt = require("jsonwebtoken");
require('dotenv').config();

// usersRouter.get("/", async (req, res, next) =>{
//     try {
//         const allUsers = await getAllUsers();
//         res.send(allUsers)
//     } catch (error) {
//         throw error
//     }
// } );

usersRouter.post('/register', async (req, res, next) => {
    const { firstname, lastname, email, imgURL, username, password, isAdmin, address } = req.body;
    const _user = await getUserByUsername(username);
    try {
        if (_user) {
            res.status(409)
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            });
        }

        if (password.length < 8) {
            res.status(406)
            next({
                name: "Password is too short",
                message: "Password must be longer than 8 characters"
            });
        }

        const user = await createUser({
            firstname:firstname,
            lastname:lastname,
            email: email,
            imgURL: imgURL,
            username: username,
            password: password,
            isAdmin: isAdmin,
            address: address
        });

        const token = jwt.sign({ 
            id: user.id, 
            username
            }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({ 
            message: "thank you for signing up",
            token,
            user
        });

    } catch ({ name, message }) {
        next({ name, message })
    } 
});

usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a name and password"
        })
        res.send(406)
    }

    try {
        const user = await getUserByUsername(username);
        if (password === user.password) {

            const token = jwt.sign({ 
                id: user.id, 
                username
                }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({message: "You're logged in!", token})
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Name or password is incorrect"
            })
            res.send(409)
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/me", isLoggedIn, async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next (error);
    }
})

usersRouter.get("/:userId/orders", isLoggedIn, isAdmin, async (req, res, next) => {
    const {userId} = req.body
    try {
        const allOrdersByUser = await getOrdersByUser({userId})
        res.send(allOrdersByUser)
    } catch (error) {
        throw error;
    };
});

module.exports = usersRouter;