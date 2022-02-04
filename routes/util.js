const { getUserById } = require("../db")

function isLoggedIn(req, res, next) {
    if(!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in"
        });
    };
    next();
};

function isAdmin(req, res, next) {
    const _user = getUserById(req.id)
    if(!_user.isAdmin) {
        res.status(403);
        next({
            name: "AccessDenied",
            message: "You must be an administrator to access this page."
        });
    };
    next();
};

module.exports = {
    isLoggedIn,
    isAdmin
}