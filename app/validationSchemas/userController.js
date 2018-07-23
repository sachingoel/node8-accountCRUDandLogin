'use strict';

let {celebrate,Joi} = require('celebrate');

exports.registerUser = {
  body:Joi.object().keys({
    firstName   :Joi.string().min(3).max(15).required(),
    lastName    :Joi.string().min(3).max(15),
    mobileNumber:Joi.string().regex(/[0-9]{10}/).required(),
    email       :Joi.string().email(/*{minDomainAtoms:2}*/).required(),
    password    :Joi.string().alphanum().min(6).max(15).required(),
    address     :Joi.object()
  })
}

exports.login = {
	body:Joi.object().keys({
		email				: Joi.string().email().required(),
		mobileNumber: Joi.string().regex(/[0-9]{10}/),
		password		: Joi.string().alphanum().min(6).max(15).required()
	}).nand('email','mobileNumber')
}


exports.updateuser = {
  header:Joi.object.keys({
    accessToken : joi.string().required()
  }),
  body:Joi.object().keys({
    firstName   :Joi.string().min(3).max(15),
    lastName    :Joi.string().min(3).max(15),
    mobileNumber:Joi.string().regex(/[0-9]{10}/),
    email       :Joi.string().email(/*{minDomainAtoms:2}*/),
    password    :Joi.string().alphanum().min(6).max(15),
    address     :Joi.object()
  })
}