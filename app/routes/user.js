'use strict'
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const validationSchemas = require('./../validationSchemas/userController');

let {celebrate}= require('celebrate');

router.post('/register',celebrate(validationSchemas.registerUser),userController.registerUser);
router.post('/log',celebrate(validationSchemas.login),userController.userLogin);
router.put('/profile',celebrate(validationSchemas.updateuser),userController.userUpdate);

module.exports = router;
