'use strict'
const express = require('express');
const router = express.Router();
const stocksController = require('./../controllers/stocksController');
const validationSchemas = require('./../validationSchemas/stocksController');

let {celebrate}= require('celebrate');



router.get('/data',celebrate(validationSchemas.data),stocksController.getData);
router.get('/probability/:stock',stocksController.getProbability);


module.exports = router;