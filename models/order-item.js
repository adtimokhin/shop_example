const Sequelize = require("sequelize");
const sequelize = require("../util/database.js");

const OrderItem = sequelize.define("order-item", {
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
  }
});

module.exports = OrderItem;
