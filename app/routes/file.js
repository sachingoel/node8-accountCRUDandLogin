'use strict'
const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/fileController');
const enableAuth = require('./../utils/authUtils').authRequired;



router.post('/upload',enableAuth,fileController.uploadFile);
router.get('/list',enableAuth,fileController.listimages);


module.exports = router;