const db = require("../db")

module.exports.index = (req, res) => {
    const perPage = 8;
    const totalPage = Math.ceil(db.get("products").value().length / perPage); //13
    
    const step = 2;

    let page = parseInt(req.query.page) || 1;
    if(req.query.page<0) page = null;
    if(req.query.page>totalPage) page = null;

    const start = (page-1) * perPage;
    const end = page * perPage;

    const p1 = page - step;
    const p2 = page + step;

    let pagi = 9;
    if(totalPage <= 9)
        pagi=totalPage;

    res.render("products/index", {
        products: db.get("products").value().slice(start, end),
        page,
        pagi,
        totalPage,
        step,
        p1,
        p2
    })
}