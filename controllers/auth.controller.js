const db = require("../db");
const shortid = require("shortid");
const md5 = require("md5");

module.exports.signup = (req, res) => {
    res.render("auth/signup")
}

module.exports.postSignup = (req, res) => {
    let { id, email, password } = req.body;
    id = shortid.generate();
    password = md5(req.body.password);
    db.get("users").push({ id, email, password }).write();

    res.cookie("userId", id, { signed: true });
    res.redirect("/users");
}

module.exports.login = (req, res) => {
    res.render("auth/login", { isLogin: true })
}

module.exports.postLogin = (req, res) => {
    res.cookie("userId", res.locals.userId, { signed: true })
    res.redirect("/users")
}

module.exports.logout = (req, res) => {
    res.render("auth/logout")
}

module.exports.postLogout = (req, res) => {
    res.clearCookie("userId");
    res.redirect("/auth/login")
}