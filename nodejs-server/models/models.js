/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const ItemsOrders = db.define(
  'itemsorders',
  {
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

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
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

const User = db.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: Sequelize.STRING,
      validate: {
        min: 2,
        max: 20,
      },
    },
    lastname: {
      type: Sequelize.STRING,
      validate: {
        min: 2,
        max: 20,
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        min: 5,
        max: 30,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [8, 12],
          msg: 'Password must be 8-12 characters',
        },
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Item.belongsToMany(Order, { through: 'itemsorders' });
Order.belongsToMany(Item, { through: 'itemsorders' });
Order.belongsTo(User);
User.hasMany(Order);

module.exports = { User, Item, Order, ItemsOrders };
