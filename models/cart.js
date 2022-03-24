const Product = require("./product.js");

module.exports = class Cart {
  products = [];

  constructor(user = "") {
    this.user = user;
  }

  addProduct(product) {
    if (typeof product == typeof Product) {
      this.products.push({
        product: product,
        quantity: 1,
      });
    }
  }

  getProducts() {
    return this.products;
  }
};
