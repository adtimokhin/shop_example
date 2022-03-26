const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const sequelize = require("./util/database.js");

// importing routers:
const globalRouter = require("./routes/globalRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRouter.js");

//configuring template view engine
app.set("views", "views"); // specifing where views live
app.set("view engine", "ejs");

// setting global variables for all routers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder

// my routers:
app.use(cartRouter);
app.use(productRouter);
app.use(globalRouter);

// handling 404:
app.use("/", (request, respnse, next) => {
  respnse.render("error/404.ejs");
});

sequelize.sync();

app.listen(8080);
