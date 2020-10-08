const db = require("../db");

module.exports.addToCart = (req, res) => {
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;

    let count = db
        .get("sessions")
        .find({ sessionId })
        .get("cart." + productId, 0)

    db
        .get("sessions")
        .find({ sessionId })
        .set("cart." + productId, count + 1)
        .write()

    res.redirect("/products")
}