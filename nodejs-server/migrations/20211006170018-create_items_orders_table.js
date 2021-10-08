const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('itemsorders', {
      itemId: {
        type: DataTypes.UUID,
        references: {
          model: 'item',
          key: 'itemId',
        },
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        references: {
          model: 'order',
          key: 'orderId',
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }),

  down: async (queryInterface) => queryInterface.dropTable('itemsorders'),
};
