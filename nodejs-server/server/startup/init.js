const express = require('express');
const bodyparser = require('body-parser');
const middlewares = require('../../middlewares');

const healthCheckRouter = require('../routers/healthcheck');
const userRouter = require('../routers/user');
const itemRouter = require('../routers/item');
const checkoutRouter = require('../routers/checkout');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(`/api/healthcheck`, healthCheckRouter);
app.use(`/api/user`, userRouter);
app.use(`/api/item`, itemRouter);
app.use(`/api/checkout`, checkoutRouter);

app.use(middlewares.errorHandler);

module.exports = app;
