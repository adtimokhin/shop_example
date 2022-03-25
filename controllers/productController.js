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
  response
    .writeHead(301, {
      Location: urls.ALL_PRODUCTS_PATH,
    })
    .end();
};

const getAllProducts = (request, response, next) => {
  response.render("products.ejs", {
    path: urls.ALL_PRODUCTS_PATH,
    pageTitle: "All products",
    products: Product.getAllProducts(),
  });
};

// get product by its id
const getProduct = (request, response, next) => {
  let productId = request.params.productId;

  const product = Product.getProductById(productId);

  if (product) {
    response.render("product.ejs", {
      path: urls.ALL_PRODUCTS_PATH + "/" + productId,
      pageTitle: product.getTitle(),
      product: product,
    });
  } else {
    next();
  }
};

// delete product by its id
const deleteProduct = (request, response, next) => {
  const productId = request.params.productId;

  const product = Product.getProductById(productId);

  if (product) {
    Product.deleteProduct(product);
    response
      .writeHead(301, {
        Location: urls.ALL_PRODUCTS_PATH,
      })
      .end();
  } else {
    next();
  }
};

module.exports.getAddProduct = getAddProduct;
module.exports.postAddProduct = postAddProduct;

module.exports.deleteProduct = deleteProduct;

module.exports.getAllProducts = getAllProducts;

module.exports.getProduct = getProduct;
