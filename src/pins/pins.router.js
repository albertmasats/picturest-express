const express = require('express');
const router = express.Router();
const pinsController = require('./pins.controller');

router
  .route('/')
    .get(pinsController.all)
    .post(pinsController.create);

router
  .route('/:id')
    .get(pinsController.get)
    .delete(pinsController.delete)
    .put(pinsController.update);

module.exports = router;
