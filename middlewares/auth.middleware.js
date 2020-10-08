const db = require("../db");

module.exports.general = (req, res, next) => {
    const user = db.get("users").find({ id: req.signedCookies.userId }).value();
    res.locals.user = user;

    next();
}

module.exports.requireAuth = (req, res, next) => {
    const user = db.get("users").find({ id: req.signedCookies.userId }).value();

    if(!req.signedCookies.userId || !user) {
        res.redirect("/auth/login");
        return;
    }
    
    next();
}

module.exports.noRequireAuth = (req, res, next) => {
    const user = db.get("users").find({ id: req.signedCookies.userId }).value();

    if(req.signedCookies.userId || user) {
        res.redirect("/users");
        return;
    }

    next();
}