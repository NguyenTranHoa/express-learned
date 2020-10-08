const express = require('express')
const router = express.Router()

const controller = require("../controllers/auth.controller");
const validate = require("../validate/auth.validate")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/signup", authMiddleware.noRequireAuth, controller.signup)

router.post("/signup", validate.postSignup, controller.postSignup)

router.get("/login", authMiddleware.noRequireAuth, controller.login)

router.post("/login", validate.postLogin, controller.postLogin)

router.get("/logout", authMiddleware.requireAuth, controller.logout)

router.post("/logout", controller.postLogout)

module.exports = router;