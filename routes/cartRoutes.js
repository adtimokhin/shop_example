const express = require("express");
const router = express.Router();

const controller = require("../controllers/cartController.js");

router.post("/cart/add/:productId", controller.postAddProduct);

module.exports = router;
