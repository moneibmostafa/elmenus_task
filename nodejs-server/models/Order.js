/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

// class Order extends Model {}
// Order.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     totalPayment: {
//       type: Sequelize.FLOAT,
//       validate: {
//         min: 1,
//         max: 1500,
//       },
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     timestamps: true,
//     freezeTableName: true,
//     modelName: 'order',
//   }
// );

// Order.User = Order.belongsTo(User);
// Order.belongsToMany(Item, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: 'order_id',
//   },
//   through: ItemsOrders,
// });

// module.exports = Order;

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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
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
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'order_id',
    },
    through: 'itemsorders',
  });
};

module.exports = Order;
