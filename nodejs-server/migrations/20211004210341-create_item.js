const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('item', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('item');
  },
};
