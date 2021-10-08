const express = require('express');
const { logger } = require('../../logger');
const { itemController } = require('../controllers');
const schemas = require('../schemas');

const { itemCreateRequestSchema, itemUpdateRequestSchema } = schemas.itemSchema;
const router = express.Router();

router.post('/', itemCreateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing Item Create Request');
    const item = await itemController.createItem(req.body);
    res.status(201).json(item);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    logger.log('info', 'Processing All Items Get Request');
    const item = await itemController.list(req.params.id);
    res.status(200).json(item);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    logger.log('info', 'Processing Item Get Request');
    const item = await itemController.getByPk(req.params.id);
    res.status(200).json(item);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', itemUpdateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing Item Update Request');
    await itemController.updateItem(req.params.id, req.body);
    res.status(200).json({ message: 'Item updated successfully' });
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
