const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);

router.get("/refresh_token", userCtrl.refreshToken);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/info", auth.User, userCtrl.getUserInfo);

router.patch("/addcart", auth.User, userCtrl.addCart);

module.exports = router;
