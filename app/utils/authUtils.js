'use strict';
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const logger = require('./../../logger');

exports.createToken = function(user){
  let payload         =   {};
  payload.user_id     =   user._id,
  payload.firstName   =   user.firstName,
  payload.lastName    =   user.lastName,
  payload.email       =   user.email,
  payload.mobileNumber=   user.mobileNumber
    
  let token = jwt.sign(payload,'t{-}!s+!s+t{-}<+$<(R<t+k<Y',{
    expiresIn	: 15 * 60, // expires in 15 minutes; time expressed in seconds,
    subject		: 'cClient Identity Information',
    audience	: 'cClient Audience',
    issuer		: 'cClient Auth service',
    algorithm	: 'HS512'
	})
	return token;
}


exports.authRequired = async function(req,res,next){
  try{
    let decoded = await jwt.verify(req.headers['x-auth-token'],'t{-}!s+!s+t{-}<+$<(R<t+k<Y');
    let user = await User.findById(decoded.user_id);
    if(user){
      res.locals.user=user;
      next();
    }else{
      let error = new Error();
      error.status=403
      error.message= "You are unauthorized to make this call";
      throw error;
    }
  }catch(error){
    logger.error("Unauthorized attempt!!");
    error.status=401;
    res.json({'success':false,error:error})
  }
}