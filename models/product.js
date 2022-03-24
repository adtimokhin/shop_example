products = [];

module.exports = class Product {
  static id = 1;

  constructor(name, imageURL) {
    this.title = name;
    this.imageURL = imageURL;
    this.id = Product.id++;

    products.push(this);
  }

  getTitle() {
    return this.title;
  }

  getImageURL() {
    return this.imageURL;
  }

  getId() {
    return this.id;
  }

  static getAllProducts() {
    return products;
  }
};
