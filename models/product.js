products = [];

module.exports = class Product {
  static id = 1;

  constructor(name, imageURL, quantity = 10) {
    this.title = name;
    this.imageURL = imageURL;
    this.quantity = quantity;
    this.id = Product.id++;
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

  getQuantity() {
    return this.quantity;
  }

  // Static methods:
  static getAllProducts() {
    return products;
  }

  static addProduct(product) {
    products.push(product);
  }

  static getProductById(id) {
    products.forEach((product) => {
      if (product.getId() == id) {
        return product;
      }
    });

    return null;
  }
};
