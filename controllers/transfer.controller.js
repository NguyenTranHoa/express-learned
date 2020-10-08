const db = require("../db")
const shortid = require("shortid")

module.exports.create = (req, res) => {
    res.render("transfer/create", {
        csrfToken: req.csrfToken()
    });
}

module.exports.postCreate = (req, res) => {
    const data = {
        accountId: req.body.accountId,
        amount: parseInt(req.body.amount),
        id: shortid.generate(),
        userId: req.signedCookies.userId
    }
    db.get("transfer").push(data).write();
    res.redirect("/transfer/create")
}