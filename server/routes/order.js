const router = require("express").Router();
const auth = require("../middleware/auth");
const orderCtrl = require("../controllers/order");

router.post("/detail", auth.User, orderCtrl.createOrder);
router.get("/history/:id", auth.User, orderCtrl.orderHistory);
router.get("/view/:order_id", orderCtrl.viewOrder);

module.exports = router;
