const { Router } = require("express");
const UsersController = require("./controllers/UsersController.js");
const AuthController = require("./controllers/AuthController.js");

const verifyAccessToken = require("./middlewares/verifyAccessToken.js");

const router = new Router();

// Auth
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/refresh", AuthController.refresh);

// Users
router.get("/users", verifyAccessToken, UsersController.fetchAll);
module.exports = router;

// ping
router.get('/ping', (req, res) => {
    res.send('pong');
});