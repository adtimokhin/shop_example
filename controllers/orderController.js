const Order = require("../models/order.js");
const Product = require("../models/product.js");

const postAddProduct = (request, response, next) => {
  const productId = request.params.productId;

  let cart;

  request.user
    .getOrder()
    .then((order) => {
      if (!order) {
        return request.user.createOrder();
      }

      return order;
    })
    .then((order) => {
      cart = order;

      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products) {
        console.log(products[0]);
        products[0].orderItem.quantity += 1;
        return cart.addProduct(products[0], {
          through: { quantity: products[0].orderItem.quantity },
        });
      }
      return Product.findOne({ where: { id: productId } }).then((product) => {
        console.log(product);
        console.log(cart);
        cart.addProduct(product);
      });
    })

    .then(() => {
      console.log("Order was updated");
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postAddProduct = postAddProduct;
