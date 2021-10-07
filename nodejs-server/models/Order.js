/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Order = db.define(
  'order',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    totalPayment: {
      type: Sequelize.FLOAT,
      validate: {
        min: 1,
        max: 1500,
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.User);
  Order.belongsToMany(models.Item, {
    foreignKey: 'order_id',
    through: 'items_orders',
  });
};

module.exports = Order;
