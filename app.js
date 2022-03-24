const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// importing routers:
const globalRouter = require("./routes/globalRoutes.js");

//configuring template view engine
app.set("views", "views"); // specifing where views live
app.set("view engine", "ejs");

// setting global variables for all routers
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder
app.use(globalRouter);

app.listen(8080);
