const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user.route")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("index", {
        name: "Hoa"
    });
})

app.use("/users", userRoutes)

app.listen(port, () => console.log("Server listening on port " + port))