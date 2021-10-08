const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('order', {
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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('order');
  },
};
