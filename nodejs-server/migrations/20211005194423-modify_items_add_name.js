module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('item', 'name', {
        type: Sequelize.STRING,
        validate: {
          min: 2,
          max: 200,
        },
      }),
    ]),

  down: async (queryInterface, Sequelize) =>
    Promise.all([queryInterface.removeColumn('item', 'name')]),
};
