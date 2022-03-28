const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

const urls = require("../static/urls.js");

router.get(urls.ADD_PRODUCT_PATH, productController.getAddProduct);
router.post(urls.ADD_PRODUCT_PATH, productController.postAddProduct);

router.get(
  "/admin/products/delete/:productId",
  productController.deleteProduct
);

router.get(
  urls.ALL_PRODUCTS_PATH + urls.UPDATE_ACTION + "/:productId",
  productController.getUpdateProduct
);

router.post(
  urls.ALL_PRODUCTS_PATH + urls.UPDATE_ACTION,
  productController.updateProduct
);

module.exports = router;
