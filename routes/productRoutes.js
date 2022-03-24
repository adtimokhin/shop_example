const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController.js");

const urls = require("../static/urls.js");

router.get(urls.ADD_PRODUCT_PATH, controller.getAddProduct);
router.post(urls.ADD_PRODUCT_PATH, controller.postAddProduct);

router.get(urls.ALL_PRODUCTS_PATH, controller.getAllProducts);

router.get(urls.ALL_PRODUCTS_PATH + "/:productId", controller.getProduct);

module.exports = router;
