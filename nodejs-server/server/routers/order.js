const express = require('express');
const { logger } = require('../../logger');
const { orderController } = require('../controllers');
const schemas = require('../schemas');

const { orderCreateRequestSchema } = schemas.orderSchema;
const router = express.Router();

router.post('/', orderCreateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing Order Create Request');
    const item = await orderController.checkout(req.body);
    res.status(201).json(item);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
