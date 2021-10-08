const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');
const Order = require('./Order');

class User extends Model {}
User.init(
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
    sequelize: db,
    timestamps: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

User.Order = User.hasMany(Order);

module.exports = User;

// const User = db.define(
//   'user',
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     firstname: {
//       type: Sequelize.STRING,
//       validate: {
//         min: 2,
//         max: 20,
//       },
//     },
//     lastname: {
//       type: Sequelize.STRING,
//       validate: {
//         min: 2,
//         max: 20,
//       },
//     },
//     email: {
//       type: Sequelize.STRING,
//       unique: true,
//       validate: {
//         min: 5,
//         max: 30,
//       },
//     },
//     password: {
//       type: Sequelize.STRING,
//       validate: {
//         len: {
//           args: [8, 12],
//           msg: 'Password must be 8-12 characters',
//         },
//       },
//     },
//   },
//   {
//     timestamps: true,
//     freezeTableName: true,
//   }
// );

// User.associate = (models) => {
//   User.hasMany(models.Order, {
//     foreignKey: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       name: 'user_id',
//     },
//   });
// };

// module.exports = User;
