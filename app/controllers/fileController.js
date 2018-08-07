'use strict'
const logger = require('./../../logger');
const aws = require('aws-sdk');
const Files = require('../models/Files');
const _ = require('lodash');
const async = require('async');
const Jimp = require('jimp');
const awsS3 = require('./../../config/authKeys').aws;
const mongoose = require('mongoose');
// ,     ObjectId = mongoose.Types.ObjectId();

async function uploadFile(req, res, next){
  let AWS_ACCESS_KEY = awsS3.access_key;
  let AWS_SECRET_KEY = awsS3.secret_key;
  let S3_BUCKET = process.env.s3Bucket || 'sachin-bucket-086';

  aws.config.update({accessKeyId:AWS_ACCESS_KEY,secretAccessKey:AWS_SECRET_KEY})
  let s3 = new aws.S3();
  let fileArray=[];
  async.waterfall([
    function(callback){
      async.eachOfSeries(req.files,(value,key,eachOfCallback)=>{// Iterate over no of given files,and upload them to s3 

        async.waterfall([
          function(callback){ // This function will take care of resizing or other image filters, if given
            if(req.body.height && req.body.height[key] && req.body.width && req.body.width[key]){
              Jimp.read(value.buffer)
              .then(image=>{
                image.resize(Number(req.body.height[key]),Number(req.body.width[key])).getBuffer(value.mimetype,(e,alteredBuffer)=>{
                  callback(null,alteredBuffer)
                })
              })
            }else{ // In case no height or width is specified pass the original buffer to callback
              callback(null,value.buffer)
            }
          },
          function(alteredBuffer,callback){//This function will upload the image to s3 and push the result to fileArray
            let fileObject={};
            fileObject['fileName']                = value.originalname;
            fileObject['format']                  = value.mimetype;
            fileObject['userId']                  = res.locals.user._id;
            fileObject['bucket']                  = S3_BUCKET
            req.body.description[key]             ? (fileObject['description'] = req.body.description[key]) : fileObject['description']=null;
            (req.body.tags && req.body.tags[key]) ? (fileObject['tags'] = req.body.tags[key])               : fileObject['tags']=null;
            (req.body.isPublic[key] == 'true' )   ? (fileObject['isPublic'] = req.body.isPublic[key])       : fileObject['isPublic']=false;


            let putOptions={
              Bucket      : S3_BUCKET,
              Key         : res.locals.user.id + value.originalname,
              ContentType : value.mimetype,
              ACL         : (req.body.isPublic[key] == 'true')  ? 'public-read' : 'private',
              Body        : alteredBuffer,
              Tagging     : "fname=sachin&lname=goel"
            }

            s3.upload(putOptions,(err,result)=>{
              if(err)
                logger.error("Error while uploading file %s to s3 is: ",value.originalname,err);
              err ? fileObject['status'] = 'FAILED' : ((fileObject['status'] = 'COMPLETED') && (fileObject['url'] = result.Location) && (fileObject['versionId'] = result.VersionId));
              fileArray.push(fileObject);
              eachOfCallback()
            })
          }// End of function that upload file to s3 in inner waterfall
        ])       
      },function(err){//Outer callback function for eachOfSeries
        err ? callback(err) : callback(null,fileArray)
      })//End of eachOfSeries
    },
    function(fileArray,callback){//Function that will bulk insert the status and result of uploaded files in db
      Files.insertMany(fileArray,(err,response)=>{
        let successfull_uploads = (_.filter(response,{status:'COMPLETED'})).length ;
        let result = _.map(response, _.partialRight(_.pick,['fileName', 'url']));
        err ? callback(err) : callback(null,{successfull_uploads : successfull_uploads , uploads : result})
      })
    }
  ],function(err,result){
    if(err){
      res.json({success:false,error:err})
    }
    res.json({success:true,result:result});
  })
}

async function uploadInMongo(req, res, next){
  // controller to upload files to local mongo gridFs
}

async function listimages(req,res,next){
  let filter = {userId:mongoose.Types.ObjectId(res.locals.user._id)}
  if(req.query.isPublic){
    filter['isPublic'] = req.query.isPublic
  }
  if(req.query.bucket){
    filter['bucket'] = req.query.bucket;
  }
  if(req.query.format){
    filter['format'] = req.query.filter;
  }
  if(req.query.status){
    filter['status'] = req.query.status;
  }
  if(req.query.fileName){
    filter['fileName'] = req.query.fileName;
  }
  Files.find(filter,{},{skip: +(req.query.page * req.query.pagesize), limit: +req.query.pagesize},(err,result)=>{
    if(err){
      logger.error("Error while fetching files list from db: ",err);
      res.json({success:false,error:err})
    }
    res.json({success:true,result:result});
  })
}

exports.uploadFile = uploadFile;
exports.uploadInMongo = uploadInMongo;
exports.listimages = listimages;