const Product = require("../models/product.js");
const Cart = require("../models/cart.js");

const urls = require("../static/urls.js");

const getAddProduct = (request, response, next) => {
  response.render("addProduct.ejs", {
    path: urls.ADD_PRODUCT_PATH,
    pageTitle: "Add a new awesome product!",
  });
};

const postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const quantity = request.body.quantity;
  const imageURL = request.body.imageURL;

  const product = new Product(title, imageURL, quantity);

  Product.addProduct(product);

  response.status(302).render("products.ejs", {
    path: urls.ALL_PRODUCTS_PATH,
    pageTitle: "All products",
    products: Product.getAllProducts(),
  });
};

const getAllProducts = (request, response, next) => {
  response.render("products.ejs", {
    path: urls.ALL_PRODUCTS_PATH,
    pageTitle: "All products",
    products: Product.getAllProducts(),
  });
};

module.exports.getAddProduct = getAddProduct;
module.exports.postAddProduct = postAddProduct;

module.exports.getAllProducts = getAllProducts;
