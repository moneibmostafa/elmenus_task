const Sequelize = require('sequelize');
const config = require('../config');
const { logger } = require('../logger');

let sequelize;

const databaseInit = () => {
  sequelize = new Sequelize(
    `${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`,
    {
      logging: function (str) {
        logger.log('info', `Sequelize: ${str}`);
      },
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      logger.log('info', 'Database connection has been established successfully.');
    }
    )
    .catch((error) => {
      logger.log('error', 'Unable to connect to the database:', error);
      setTimeout(() => databaseInit(), 5000);
    }
    );
  
  sequelize
    .sync({ alter: true })
    .then(() => logger.log('info', 'sync successful.'))
    .catch((error) => logger.log('error', 'sync failure', error));
}

databaseInit();

module.exports = sequelize;
