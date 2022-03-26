const Sequelize = require("sequelize");

const sequelize = new Sequelize("example_shop_schema", "root", "Gur246zaa", {
  host: "localhost",
  dialect: "mysql",
  logging: true, // to see sql in console set this to true.
});

module.exports = sequelize;
