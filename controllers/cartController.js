const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

const postAddProduct = (request, response, next) => {
  const productId = request.params.productId;

  let fetchedCart;
  request.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return request.user.createCart();
      }

      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;

      return fetchedCart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products.length > 0) {
        products[0].cartItem.quantity += 1;
        return fetchedCart.addProduct(products[0], {
          through: { quantity: products[0].cartItem.quantity },
        });
      }
      return Product.findOne({ where: { id: productId } }).then((product) => {
        fetchedCart.addProduct(product);
      });
    })

    .then(() => {
      console.log("Order was updated");
      response.redirect("/"); // todo: update the redirects!!!
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postAddProduct = postAddProduct;
