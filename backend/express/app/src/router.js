const { Router } = require("express");
const UsersController = require("./controllers/UsersController.js");
const AuthController = require("./controllers/AuthController.js");

const verifyAccessToken = require("./middlewares/verifyAccessToken.js");
const UnitsController = require("./controllers/UnitsController.js");
const EventsController = require("./controllers/EventController.js");

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

// Units
router.get("/units", verifyAccessToken, UnitsController.get);
router.post("/units", verifyAccessToken, UnitsController.update);

router.get("/events", verifyAccessToken, EventsController.index);
//router.post("/events", verifyAccessToken, EventsController.add);
router.get("/events/:id", verifyAccessToken, EventsController.view);
//router.put("/events/:id", verifyAccessToken, EventsController.update);

// ping
router.get('/ping', (req, res) => {
    res.send('pong');
});

module.exports = router;