'use strict';
let User = require('./../models/User');
const bcrypt  = require('bcrypt');
const logger = require('./../../logger');

async function registerUser(req,res,next){
  
  try{
    let user = await User.findOne({'email':req.body.email,"isVerified":true});
    if(user){
      let error = new Error();
      error.msg = 'Email or mobile number already exists,please register with diffrent email id or mobile number.'
    }
    let salt = await bcrypt.genSalt(4);
    let pwd = await bcrypt.hash(req.body.password,salt);
    let newUser = new User();
				newUser.firstName = req.body.firstName;
    		newUser.lastName = req.body.lastName;
    		newUser.address = req.body.address;
    		newUser.mobileNumber = req.body.mobileNumber;
        newUser.email = req.body.email;
        newUser['password'] = hash;
        delete req.body.password;
        let result = await newUser.save();
  }catch(error){

  }
}





exports.registerUser = registerUser;