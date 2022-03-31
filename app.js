const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database.js").mongoConnect;

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGO_URI = require("./util/database.js").MONGO_URI;

const app = express();

const store = new MongoDBStore({
  uri: MONGO_URI,
  session: "sessions",
});

// importing routers:
const globalRouter = require("./routes/globalRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

const User = require("./models/user.js");

//configuring template view engine
app.set("views", "views"); // specifing where views live
app.set("view engine", "ejs");

// setting global variables for all routers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder

app.use(
  session({
    secret: "Jjdnuu10e673hsbsb", // todo: create a routine that will generate session key and store it in a special config file on the fly.
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((request, response, next) => {
  // temporary measure until we do not have authentication in place.
  // add a user to all requests!!
  User.findById("6242088033f9e35acab0abaa")
    .then((user) => {
      request.user = new User(
        user.name,
        user.email,
        user.password,
        user.cart,
        user._id
      );
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// my routers:
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(adminRouter);
app.use(globalRouter);

// handling 404:
app.use("/", (request, respnse, next) => {
  respnse.render("error/404.ejs");
});

mongoConnect(() => {
  app.listen(8080);
});
