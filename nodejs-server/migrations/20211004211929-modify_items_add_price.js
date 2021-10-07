module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('item', 'price', {
        type: Sequelize.FLOAT,
        validate: {
          min: 1,
          max: 1500,
        },
      }),
    ]),

  down: async (queryInterface, Sequelize) =>
    Promise.all([queryInterface.removeColumn('item', 'price')]),
};
