/* eslint-disable no-param-reassign */
const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');
const Order = require('./Order');
const ItemsOrders = require('./Items_Orders');

class Item extends Model {}
Item.init(
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
    sequelize: db,
    timestamps: true,
    freezeTableName: true,
    modelName: 'item',
  }
);

Item.belongsToMany(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: 'item_id',
  },
  through: ItemsOrders,
});

module.exports = Item;

// const Item = db.define(
//   'item',
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     availabilityCount: {
//       type: Sequelize.INTEGER,
//       validate: {
//         min: 0,
//         max: 100,
//       },
//     },
//     available: {
//       type: Sequelize.BOOLEAN,
//     },
//     price: {
//       type: Sequelize.FLOAT,
//       validate: {
//         min: 1,
//         max: 1500,
//       },
//     },
//     name: {
//       type: Sequelize.STRING,
//       validate: {
//         min: 2,
//         max: 200,
//       },
//     },
//   },
//   {
//     timestamps: true,
//     freezeTableName: true,
//   }
// );

// // Item.belongsToMany(Order, {
// //   foreignKey: {
// //     type: DataTypes.UUID,
// //     allowNull: false,
// //     name: 'item_id',
// //   },
// //   through: ItemsOrders,
// // });

// Item.associate = (models) => {
//   Item.belongsToMany(models.Order, {
//     foreignKey: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       name: 'item_id',
//     },
//     through: Items_Orders,
//   });
// };

// Item.afterValidate('updateAvailabilityHook', (item, options) => {
//   if (item.availabilityCount === 0) item.available = false;
//   else item.available = true;
// });

// module.exports = Item;
