const express = require("express");
const router = express.Router();

const controller = require("../controllers/cartController.js");

router.get("/cart", controller.getCart);
router.post("/cart/add/:productId", controller.postAddProduct);
router.post("/cart/delete/one/:productId", controller.postRemoveOneProduct);

module.exports = router;
