const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

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

User.associate = (models) => {
  User.hasMany(models.Order, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};

module.exports = User;
