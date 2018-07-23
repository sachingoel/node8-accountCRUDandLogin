'use strict';
const jwt = require('jsonwebtoken');

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