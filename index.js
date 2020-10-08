require('dotenv').config();

const express = require("express")
const app = express();
const port = 4000;

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const csrf = require('csurf')

const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")
const productRoutes = require("./routes/product.route")
const cartRoutes = require("./routes/cart.route")
const transferRoutes = require("./routes/transfer.route")

const apiProductRoutes = require("./api/routes/product.route")

const authMiddleware = require("./middlewares/auth.middleware")
const sessionMiddleware = require("./middlewares/session.middleware")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(authMiddleware.general)
app.use(sessionMiddleware)

app.use(express.static('public'))

app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/cart", cartRoutes)

app.use(csrf({ cookie: true }));
app.use("/transfer", transferRoutes)

app.use("/api/products", apiProductRoutes)

app.set('view engine', 'pug')
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("index", {
        name: "Hoa"
    });
})

app.listen(port, () => console.log("Server listening on port " + port))