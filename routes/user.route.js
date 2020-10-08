const express = require('express')
const router = express.Router()

const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

const validate = require("../validate/user.validate")
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware.requireAuth, controller.index);

router.get("/search", authMiddleware.requireAuth, controller.search);

router.get("/create", authMiddleware.requireAuth, controller.create);

router.post("/create",
    upload.single("avatar"),
    validate.postCreate, 
    controller.postCreate
);

router.get("/:id", authMiddleware.requireAuth, controller.view);

module.exports = router;