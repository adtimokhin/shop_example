const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

router.get("/admin/products/add", productController.getAddProduct);
router.post("/admin/products/add", productController.postAddProduct);

router.get("/admin/products/delete/:productId", productController.deleteProduct);

module.exports = router;
