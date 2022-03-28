const express = require("express");
const router = express.Router();

const controller = require("../controllers/orderController.js");

router.get("/orders", controller.getOrders);

router.post("/add/order", controller.postOrder);

module.exports = router;
