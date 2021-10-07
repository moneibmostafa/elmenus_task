const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('user', {
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
          min: 8,
          max: 12,
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('user');
  },
};
