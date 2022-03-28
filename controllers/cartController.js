const Cart = require("../models/cart.js");
const CartItem = require("../models/cart-item.js");
const Product = require("../models/product.js");

const getCart = (requset, response, next) => {
  let fetchedCart;

  requset.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return fetchedCart.getProducts();
    })
    .then((products) => {
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
      response.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postRemoveOneProduct = (request, response, next) => {
  const user = request.user;
  let fetchedCart;
  const productId = request.params.productId;
  user
    .getCart()
    .then((cart) => {
      if (!cart) {
        console.log("No cart was found!");
        next(); // temporary solution!!
      } else {
        fetchedCart = cart;
        fetchedCart
          .getProducts()
          .then((products) => {
            if (products.length > 0) {
              fetchedCart
                .getProducts({ where: { id: productId } })
                .then((product) => {
                  product = product[0];
                  const quantity = product.cartItem.quantity;
                  if (quantity == 1) {
                    //return fetchedCart.addProduct(products[0], {
                    // through: { quantity: products[0].cartItem.quantity },
                    // });
                    return fetchedCart.removeProduct(product);
                  } else {
                    product.cartItem.quantity -= 1;
                    return fetchedCart.addProduct(product, {
                      through: { quantity: product.cartItem.quantity },
                    });
                  }
                })
                .then(() => {
                  response.redirect("/cart"); // change that!
                });
            } else {
              console.log("Cart is empty!!!");
              next(); // temporary solution!!
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCart = getCart;
module.exports.postAddProduct = postAddProduct;
module.exports.postRemoveOneProduct = postRemoveOneProduct;
