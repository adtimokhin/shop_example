const express = require("express");
const router = express.Router();

const controller = require("../controllers/globalController.js");

const urls = require("../static/urls.js");

router.get("/say_hi", controller.getIndex);

router.get("/add/product", controller.postAddProduct);

router.get(urls.ALL_PRODUCTS_PATH, controller.getAllProducts);

module.exports = router;
