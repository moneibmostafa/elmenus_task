/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { DataTypes } = require('sequelize');
const db = require('../database');

// class ItemsOrders extends Model {}
// ItemsOrders.init(
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
//     sequelize: db,
//     timestamps: true,
//     freezeTableName: true,
//     modelName: 'ItemsOrders',
//   }
// );

// ItemsOrders.belongsTo(Order, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: 'order_id',
//   },
// });
// ItemsOrders.belongsTo(Item, {
//   foreignKey: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     name: 'item_id',
//   },
// });

// module.exports = ItemsOrders;

const ItemsOrders = db.define(
  'itemsorders',
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
    timestamps: true,
    freezeTableName: true,
  }
);

ItemsOrders.associate = (models) => {
  ItemsOrders.belongsTo(models.Order, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'order_id',
    },
  });
  ItemsOrders.belongsTo(models.Item, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'item_id',
    },
  });
};

module.exports = ItemsOrders;
