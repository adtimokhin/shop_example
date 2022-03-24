const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// importing routers:
const globalRouter = require("./routes/globalRoutes.js");
const productRouter = require("./routes/productRoutes.js");

//configuring template view engine
app.set("views", "views"); // specifing where views live
app.set("view engine", "ejs");

// setting global variables for all routers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder

// my routers:
app.use(globalRouter);
app.use(productRouter);

// handling 404:
app.use("/", (request, respnse, next) => {
  respnse.render("error/404.ejs");
});

app.listen(8080);
