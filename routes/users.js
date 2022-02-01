const usersRouter = require("express").Router();
const {  getAllUsers, createUser, getUserByUsername } = require("../db");
const { isLoggedIn } = require("./util")
const jwt = require("jsonwebtoken");

// NOT BE TO PUSHED INTO THE FINAL PRODUCT. 
// Uncomment to see users in the localhost:4000/api/users
// usersRouter.get("/", async (req, res, next) =>{
//     console.log("Got here!")
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
            username: username,
            password: password
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
        if (username && password) {

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

usersRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = usersRouter;