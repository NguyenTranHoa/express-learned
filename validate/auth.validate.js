const db = require("../db");
const md5 = require("md5")

module.exports.postSignup = (req, res, next) => {
    let errors = [];
    const { email, password, confirm_password } = req.body;
    const user = db.get("users").find({ email: email }).value();
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(user) {
        errors.push("Email is exist")
    }

    if(!email) {
        errors.push("Email is required");
    }
    
    if(!email.match(mailformat)) {
        errors.push("Email is incorrect format");
    }

    if(password.length < 6) {
        errors.push("Password is 6 characters at least");
    }

    if(password !== confirm_password) {
        errors.push("Password and Confirm password should match!")
    }

    if(errors.length) {
        res.render("auth/signup", {
            errors: errors
        })
        return;
    }

    next();
}

module.exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    const user = db.get("users").find({ email: email }).value();

    if(!user) {
        res.render("auth/login", {
            errors: ["User does not exist"]
        })
        return;
    }

    if(user.password !== md5(password)) {
        res.render("auth/login", {
            errors: ["Wrong password"]
        })
        return;
    }
    
    res.locals.userId = user.id;

    next();
}

