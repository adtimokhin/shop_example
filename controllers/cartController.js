const Cart = require("../models/cart.js");
const Product = require("../models/product");

const urls = require("../static/urls.js");

// for now we will have a hard-coded, shared cart.

const cart = new Cart();

const getViewCart = (request, response, next) => {
  response.render("cart.ejs", {
    path: urls.CART_VIEW_PATH,
    pageTitle: "Cart",
    products: cart.getProducts(),
  });
};

const postAddProductToCart = (request, response, next) => {
  const productId = request.params.productId;

  const product = Product.getProductById(productId);

  if (product) {
    cart.addProduct(product);

    response.writeHead(301, { Location: urls.CART_VIEW_PATH }).end();
  } else {
    next();
  }
};

const deleteProductFromCart = (request, response, next) => {
  const productId = request.params.productId;

  const product = Product.getProductById(productId);

  if (product) {
    const id = cart.contains(product);
    if (!(id === 0 || id)) {
      response.render("error/404").end(); // todo: change so that user is redirected to a page that says that this product is not in a cart.
    }

    cart.deleteProduct(product);

    response.writeHead(301, { Location: urls.CART_VIEW_PATH }).end();
  } else {
    next();
  }
};

module.exports.getViewCart = getViewCart;

module.exports.postAddProductToCart = postAddProductToCart;

module.exports.deleteProductFromCart = deleteProductFromCart;
