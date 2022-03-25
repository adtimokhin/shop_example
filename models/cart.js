const Product = require("./product.js");

module.exports = class Cart {
  products = [];

  constructor(user = "") {
    this.user = user;
  }

  addProduct(product) {
    const id = this.contains(product);
    if (id === 0 || id) {
      this.products[id].quantity++;
    } else {
      this.products.push({
        product: product,
        quantity: 1,
      });
    }
  }

  deleteProduct(product) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].product.id == product.id) {
        this.products.splice(i, 1);
        return;
      }
    }
  }

  contains(product) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].product.id == product.id) {
        return i;
      }
    }
    return false;
  }

  getProducts() {
    return this.products;
  }
};
