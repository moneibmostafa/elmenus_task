const express = require('express');
const { logger } = require('../../logger');
const { userController } = require('../controllers');
const schemas = require('../schemas');

const { userCreateRequestSchema, userUpdateRequestSchema } = schemas.userSchema;
const router = express.Router();

router.post('/', userCreateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing User Create Request');
    const user = await userController.createUser(req.body);
    res.status(201).json(user);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    logger.log('info', 'Processing User Get Request');
    const user = await userController.getUserByID(req.params.id);
    res.status(200).json(user);
    return next();
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', userUpdateRequestSchema, async (req, res, next) => {
  try {
    logger.log('info', 'Processing User Update Request');
    await userController.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
