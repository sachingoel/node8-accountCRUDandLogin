'use strict'
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const validationSchemas = require('./../validationSchemas/userController');
const enableAuth = require('./../utils/authUtils').authRequired;

let {celebrate}= require('celebrate');

router.post('/register',celebrate(validationSchemas.registerUser),userController.registerUser);
router.post('/log',celebrate(validationSchemas.login),userController.userLogin);
router.put('/profile',enableAuth,celebrate(validationSchemas.updateuser),userController.userUpdate);

module.exports = router;
