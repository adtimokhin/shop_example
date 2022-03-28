const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const sequelize = require("./util/database.js");

// importing routers:
const globalRouter = require("./routes/globalRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");

// models:
const User = require("./models/user.js");
const Cart = require("./models/cart.js");
const Product = require("./models/product.js");
const CartItem = require("./models/cart-item.js");

//configuring template view engine
app.set("views", "views"); // specifing where views live
app.set("view engine", "ejs");

// setting global variables for all routers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder

app.use((request, response, next) => {
  // temporary measure until we do not have authentication in place.
  User.findOne({ where: { id: 1 } }).then((user) => {
    request.user = user;
    next();
  });
});

// my routers:
app.use(productRouter);
app.use(cartRouter);
app.use(globalRouter);

// handling 404:
app.use("/", (request, respnse, next) => {
  respnse.render("error/404.ejs");
});

// setting relations for models.

// One-To-One relation between User and Cart
User.hasOne(Cart);
Cart.belongsTo(User);

// Many-To-Many relation between Cart and Product. Join-table entity: CartItem
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
// Order.hasMany(Product, { through: OrderItem });

// Initiating the ORM and the server itself.
sequelize
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
