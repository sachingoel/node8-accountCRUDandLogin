'use strict'
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const validationSchemas = require('./../validationSchemas/userController');

let {celebrate}= require('celebrate');

router.post('/register',celebrate(validationSchemas.registerUser),userController.registerUser);
