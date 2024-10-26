const { Router } = require("express");
const UsersController = require("./controllers/UsersController.js");
const AuthController = require("./controllers/AuthController.js");

const verifyAccessToken = require("./middlewares/verifyAccessToken.js");

const router = new Router();

// Auth
router.post("/login", AuthController.login);

// Users
router.get("/users", verifyAccessToken, UsersController.fetchAll);

module.exports = router;