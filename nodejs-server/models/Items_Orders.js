/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { DataTypes, Model } = require('sequelize');
const db = require('../database');
const Order = require('./Order');
const Item = require('./Item');

class ItemsOrders extends Model {}
ItemsOrders.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
    freezeTableName: true,
    modelName: 'ItemsOrders',
  }
);

ItemsOrders.belongsTo(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: 'order_id',
  },
});
ItemsOrders.belongsTo(Item, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: 'item_id',
  },
});

module.exports = ItemsOrders;

// const Items_Orders = db.define(
//   'items_orders',
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     item_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     order_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     freezeTableName: true,
//   }
// );

// Items_Orders.belongsTo(Order, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: 'order_id',
//   },
// });
// Items_Orders.belongsTo(Item, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: 'item_id',
//   },
// });

// Items_Orders.associate = (models) => {
//   Items_Orders.belongsTo(models.Order, {
//     foreignKey: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       name: 'order_id',
//     },
//   });
//   Items_Orders.belongsTo(models.Item, {
//     foreignKey: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       name: 'item_id',
//     },
//   });
// };

// module.exports = Items_Orders;
