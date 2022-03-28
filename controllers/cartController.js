const Product = require("../models/product.js");
const User = require("../models/user.js");

const getCart = (requset, response, next) => {
  // add also the quantity field to the objects!
  requset.user
    .getCart()
    .then((products) => {
      products.map((product) => {
        product._id = product._id.toString();
      });
      response.render("cart.ejs", {
        pageTitle: "Your cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAddProduct = (request, response, next) => {
  const productId = request.params.productId;

  Product.findById(productId)
    .then((product) => {
      return request.user.addToCart(product);
    })
    .then(() => {
      response.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postRemoveOneProduct = (request, response, next) => {
  const user = request.user;
  const productId = request.params.productId;

  Product.findById(productId)
    .then((product) => {
      return request.user.removeFromCart(product);
    })
    .then(() => {
      response.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCart = getCart;
module.exports.postAddProduct = postAddProduct;
module.exports.postRemoveOneProduct = postRemoveOneProduct;
