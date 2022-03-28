const getDb = require("../util/database.js").getDb;

const mongoDB = require("mongodb");
const ObjectId = mongoDB.ObjectId;

class Product {
  constructor(title, imageURL, description, price, stock, id) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
    this.stock = stock;

    console.log("id:" + id);
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    return getDb().collection("products").insertOne(this);
  }

  update() {
    if (!this._id) {
      throw "Attempted to update a product that does not exist in a database.";
    }

    return getDb()
      .collection("products")
      .updateOne({ _id: this._id }, { $set: this });
  }

  static findById(productId) {
    return getDb()
      .collection("products")
      .find({ _id: new ObjectId(productId) })
      .next();
  }

  static deleteById(productId) {
    return getDb()
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) });
  }

  static findAll() {
    return getDb().collection("products").find().toArray();
  }
}

module.exports = Product;
