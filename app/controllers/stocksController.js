'use strict';
const _ = require('lodash');
const async = require('async');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const logger = require('./../../logger');

async function getData(req,res,next){
  try{
  const results = []

    fs.createReadStream(path.join(__dirname,'../statics/generalnumber.csv'))
      .pipe(csv(req.query.select || ['Ticker','Company','Industry']))
      .on('data',(data)=>{
        results.push(data)
      })
      .on('end',() =>{
        res.status(200).send(_.map(results));
      })
  }catch(error){
    res.json({success:false,error:error})
  }
}

async function getProbability(req,res,next){
  try{
    const results = []
  
      fs.createReadStream(path.join(__dirname,'../statics/lossgaingraph.csv'))
        .pipe(csv())
        .on('data',(data)=>{
          results.push(data)
        })
        .on('end',() =>{
          res.status(200).send(_.filter(results,{Ticker:req.params.stock}));
        })
    }catch(error){
      res.json({success:false,error:error})
    }
}

exports.getData = getData;
exports.getProbability = getProbability;
