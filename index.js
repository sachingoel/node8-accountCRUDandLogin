'use Strict';
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {errors} = require('celebrate');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan('common'));

require('./routes')(app);
app.use(errors());


app.listen(process.env.port || 5454,function(err){
	if(err){
		console.log("Server stopped due to error", err);
  }
  mongoose.connect("mongodb://localhost:27017/cClient",{ useNewUrlParser: true });
	console.log("====> cClient listening on port: 5454 <====");
})
