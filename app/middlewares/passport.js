'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const authKeys = require('./../../config/authKeys');
const User = require('./../models/User');
const authUtils = require('./../utils/authUtils');

module.exports = function(passport){

  passport.use(new GoogleStrategy({
    clientID          : authKeys.google.client_id,
    clientSecret      : authKeys.google.client_secret,
    callbackURL       : authKeys.google.callback_url,
    passReqToCallback : true
  },(req,accessToken,refreshToken,profile,callback)=>{
    findAndSaveInDb(req,'google',profile,callback);
  }))


  passport.use(new FacebookStrategy({
    clientID          : authKeys.facebook.app_id,
    clientSecret      : authKeys.facebook.app_secret,
    callbackURL       : authKeys.facebook.callback_url,
    profileFields     : ['id', 'emails', 'name'],
    passReqToCallback : true
  },(req,accessToken, refreshToken,profile, callback)=>{
    if((profile.emails).length == 0){
      let error = new Error('Unable to find any email associated with this account');
      return callback(error)
    }
    findAndSaveInDb(req,'facebook',profile,callback);
  }))

}

function findAndSaveInDb(req,source,profile,callback){
  User.findOne({[source+'.email']:profile.emails[0].value},(err,user)=>{
    if(err){
      return callback(err)
    }else if(user){
      let token = authUtils.createToken(user);
      req.res.locals.token = token;
      return callback(null,{token:token})
    }else{
      let user = new User();
      user.id = profile.id,
      user.firstName = profile.name.givenName,
      user.lastName = profile.name.familyName,
      user[source].email = profile.emails[0].value
      user.save((err,result)=>{
        if(err){
          return callback(err)
        }
        let token = authUtils.createToken(result);
        req.res.locals.token = token
        return callback(null,{token:token})
      })
    }
  })
}