const { Router } = require("express");
const UsersController = require("./controllers/UsersController.js");
const AuthController = require("./controllers/AuthController.js");

const verifyAccessToken = require("./middlewares/verifyAccessToken.js");

const router = new Router();

// Auth
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/refresh", AuthController.refresh);
router.get("/logout", verifyAccessToken, AuthController.logout);

// Users
router.get("/users", verifyAccessToken, UsersController.index);
router.get("/me", verifyAccessToken, UsersController.me);
router.put("/me", verifyAccessToken, UsersController.update);
router.delete("/me", verifyAccessToken, UsersController.delete);

// ping
router.get('/ping', (req, res) => {
    res.send('pong');
});

module.exports = router;