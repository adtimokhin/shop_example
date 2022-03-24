const express = require("express");
const router = express.Router();

// Soon we will add controllers that will map some actions to urls passed in the routers. For now, the two will be combined in here.

router.get("/say_hi", (requesst, response, next) => {
  console.log("Everything is fine!");
  next();
});

module.exports = router;
