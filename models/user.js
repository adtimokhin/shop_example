const getDb = require("../util/database.js").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, password, cart, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cart = cart; // { items: [] }
    this._id = id;
  }

  // product: {
  //    productId: ObjectId("rejj@Uvujekbi#*GvyuIO"),
  //    quantity: 2
  // }

  save() {
    return getDb().collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.itemId.toString() === product._id.toString();
    });

    const cartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      cartItems[cartProductIndex].quantity += 1;
    } else {
      const newItem = { itemId: new ObjectId(product._id), quantity: 1 };
      cartItems.push(newItem);
    }

    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { "cart.items": cartItems } });
  }

  removeFromCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.itemId.toString() === product._id.toString();
    });

    let updatedItems;
    if (this.cart.items[cartProductIndex].quantity == 1) {
      updatedItems = this.cart.items.filter((item) => {
        return item.itemId.toString() !== product._id.toString();
      });
    } else {
      this.cart.items[cartProductIndex].quantity--;
      updatedItems = this.cart.items;
    }

    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { "cart.items": updatedItems } });
  }

  emptyCart() {
    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { "cart.items": [] } });
  }

  getCart() {
    const db = getDb();
    const itemIds = this.cart.items.map((i) => {
      return i.itemId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: itemIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.itemId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  static findById(userId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
  }

  static findByEmail(email) {
    return getDb().collection("users").find({ email: email }).next();
  }
}

module.exports = User;
