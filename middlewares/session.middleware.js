const db = require("../db")
const shortid = require("shortid")

module.exports = (req, res, next) => {
    
    if(!req.signedCookies.sessionId) {
        const sessionId = shortid.generate();
        res.cookie("sessionId", sessionId, { signed: true, maxAge: 24*60*60 });
        
        db.get("sessions")
            .push({
                sessionId: sessionId,
                cart: {}
            })
            .write();
    }

    const count = db.get("sessions").find({ sessionId: req.signedCookies.sessionId }).get("cart").size().value();
    
    count ? res.locals.count = count : res.locals.count = 0
    
    next();
}