const router = require("express").Router();
const productCtrl = require("../controllers/product");
const auth = require("../middleware/auth");

router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(auth.User, auth.Admin, productCtrl.createProduct);

router
  .route("/products/:id")
  .delete(auth.User, auth.Admin, productCtrl.deleteProduct)
  .put(auth.User, auth.Admin, productCtrl.updateProduct);

module.exports = router;
