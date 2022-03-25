const express = require("express");
const router = express.Router();

const controller = require("../controllers/cartController.js");

const urls = require("../static/urls.js");

router.get(urls.CART_VIEW_PATH, controller.getViewCart);
router.post(
  urls.CART_VIEW_PATH + urls.ADD_ACTION + "/:productId",
  controller.postAddProductToCart
);
router.post(
  urls.CART_VIEW_PATH + urls.DELETE_ACTION + "/:productId",
  controller.deleteProductFromCart
);

module.exports = router;
