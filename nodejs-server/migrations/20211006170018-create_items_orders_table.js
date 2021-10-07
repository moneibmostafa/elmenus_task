const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('items_orders', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      item_id: {
        type: DataTypes.UUID,
        references: {
          model: 'item',
          key: 'id',
        },
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        references: {
          model: 'order',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }),

  down: async (queryInterface) => queryInterface.dropTable('product_orders'),
};
