const getDb = require("../util/database.js").getDb;
const ObjectId = require("mongodb").ObjectId;

class Order {
  constructor(products, user) {
    this.products = [];
    products.map((product) => {
      this.products.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: product.quantity, // note: you need to make sure that every product has the quantity attribute. The easiest way is to use getCart() method in User model.
      });

      this.user = {
        _id: user._id,
        name: user.name,
      };
    });
  }

  save() {
    return getDb().collection("orders").insertOne(this);
  }

  static findAllByUserId(userId) {
    return getDb().collection("orders").find({ "user._id": userId }).toArray();
  }
}

module.exports = Order;
