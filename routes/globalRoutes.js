const express = require("express");
const router = express.Router();

const controller = require("../controllers/globalController.js");

const urls = require("../static/urls.js");

router.get(urls.INDEX_PATH, controller.getIndex);

module.exports = router;
