'use Strict';
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const {errors} = require('celebrate');
const multer = require('multer');



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({}).array('Files',10))
app.use(morgan('common'));
app.use(passport.initialize());
require('./app/middlewares/passport')(passport);



passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.get('/auth/login/google',passport.authenticate('google',{scope:['email','profile']}));
app.get('/auth/login/fb',passport.authenticate('facebook',{ scope: ['email']}));

app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
	res.json({token:res.locals.token});
});

app.get('/auth/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
	res.json({token:res.locals.token});
});

require('./routes')(app);
app.use(errors());


app.listen(process.env.port || 5454,function(err){
	if(err){
		console.log("Server stopped due to error", err);
  }
  mongoose.connect("mongodb://localhost:27017/cClient",{ useNewUrlParser: true });
	console.log("====> cClient listening on port: 5454 <====");
})
