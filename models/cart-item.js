const Sequelize = require("sequelize");
const sequelize = require("../util/database.js");

const OrderItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = OrderItem;
