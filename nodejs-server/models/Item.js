/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Item = db.define(
  'item',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    availabilityCount: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    available: {
      type: Sequelize.BOOLEAN,
    },
    price: {
      type: Sequelize.FLOAT,
      validate: {
        min: 1,
        max: 1500,
      },
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        min: 2,
        max: 200,
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Item.associate = (models) => {
  Item.belongsToMany(models.Order, {
    foreignKey: 'item_id',
    through: 'items_orders',
  });
};

Item.afterValidate('updateAvailabilityHook', (item, options) => {
  if (item.availabilityCount === 0) item.available = false;
  else item.available = true;
});

module.exports = Item;
