const Product = require("../models/product.js");
const Cart = require("../models/cart.js");

const urls = require("../static/urls.js");

const getIndex = (request, response, next) => {
  response.render("index.ejs");
};

module.exports.getIndex = getIndex;
