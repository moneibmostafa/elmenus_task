const server = require('./components/main-app');
const db = require('./components/db');
const payment = require('./components/creditcard-tool');

module.exports = { server, db, payment };
