const express = require('express');
const { logger } = require('../../logger');
const { checkoutController } = require('../controllers');
const schemas = require('../schemas');

const { checkoutCreateRequestSchema } = schemas.checkoutSchema;
const router = express.Router();

// checkout
// pay by credit card

router.post('/', checkoutCreateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing Order Create Request');
    const item = await checkoutController.createOrder(req.body);
    res.status(201).json(item);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
