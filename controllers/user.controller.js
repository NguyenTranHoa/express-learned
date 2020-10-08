const db = require("../db");
const shortid = require('shortid');

module.exports.index = (req, res) => {
    res.render("users/index", {
        users: db.get("users").value()
    })
}

module.exports.search = (req, res) => {
    let q = req.query.q;
    let resultUsers =  db.get("users").value().filter(user => user.email.substring(0, user.email.lastIndexOf("@")));

    res.render("users/index", {
        users: resultUsers,
        q: q
    });
}

module.exports.create = (req, res) => {
    res.render("users/create")
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split("/").slice(1).join("/");
    db.get("users").push(req.body).write();
    res.redirect("/users");
}

module.exports.view = (req, res) => {
    const id = req.params.id;
    const users = db.get("users").find({ id }).value();
    res.render("users/view", { users });
}