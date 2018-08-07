'use strict';
let User = require('./../models/User');
const bcrypt  = require('bcrypt');
const authUtils = require('./../utils/authUtils');
const logger = require('./../../logger');
const uuid  = require('uuid');

async function registerUser(req,res,next){
  try{
    let user = await User.findOne({'email':req.body.email});
    if(user){
      let error = new Error();
      error.msg = 'Email already exists,please register with diffrent email id.'
      throw error;
    }
    let salt = await bcrypt.genSalt(4);
    let pwd = await bcrypt.hash(req.body.password,salt);
    let newUser = new User();
        newUser.id = uuid.v4();
				newUser.firstName = req.body.firstName;
    		newUser.lastName = req.body.lastName;
    		newUser.address = req.body.address;
    		newUser.mobileNumber = req.body.mobileNumber;
        newUser.email = req.body.email;
        newUser.password = pwd;
        let result = await newUser.save();
    logger.info("User is created successfully with id: ",)
    res.json({succes:true,user_id:result.id})
  }catch(error){
    logger.error("Error while creating user for email %s is:",req.body.email,error);
    res.json({sucess:false,error:error})
  }
}

async function userLogin (req,res,next){
  try{
  let user = await User.findOne({email:req.body.email});
    if(user){
      let result = await bcrypt.compare(req.body.password,user.password);
      if(result){
        var token = authUtils.createToken(user);
        res.json({success:true,message:'Enjoy your token!',accessToken:token})
      }else{
        let error = new Error();
        error.message = "Incorrect password.Please try again."
        error.status = 401;
        throw error;
      }
    }else{
    let error = new Error();
    error.message = "User doesn't exist with this email";
    error.status = 404;
    throw error;
    }
  }catch(error){
    logger.error("Error in login for email %s is:",req.body.email,error);
    res.json({success:false,error:error})
  }
}

async function userUpdate (req,res,next){
  try{
    let updatedUser = await User.findByIdAndUpdate(res.locals.user.id,req.body);
    res.json({success:true,'updated_User':updatedUser.id})
  }catch(error){
    logger.error("Error while updating user with is: ",error);
    res.json({success:false,error:error});
  }
}

exports.registerUser = registerUser;
exports.userLogin    = userLogin;
exports.userUpdate   = userUpdate;