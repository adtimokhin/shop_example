const Order = require("../models/order.js");

const getOrders = (request, response, next) => {
  const userId = request.user._id;

  Order.findAllByUserId(userId)
    .then((orders) => {
      response.render("orders.ejs", {
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postOrder = (request, response, next) => {
  request.user
    .getCart()
    .then((items) => {
      const order = new Order(items, request.user);

      return order.save();
    })
    .then(() => {
      return request.user.emptyCart();
    })
    .then(() => {
      response.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getOrders = getOrders;

module.exports.postOrder = postOrder;
