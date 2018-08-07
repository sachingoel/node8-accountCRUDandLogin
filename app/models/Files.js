'use Strict'
const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const FileModel = new Schema({
  "fileName"		:{type:String},
  "bucket"      :{type:String},
  "description"	:{type:String},
  "format"      :{type:String},
  "userId"      :{type: Schema.Types.ObjectId, ref: 'User'},
  "tags"  :[{
    "key": {type:String},
    "value":{type:String}
  }],  
	"created_on":{type: Date,default: Date.now()},
  "isPublic"	:{type:Boolean,default:false},
  "status"    :{type:String,enum:['FAILED','PENDING','COMPLETED'],default:'PENDING'},
  "url"       :{type:String},
  "versionId" :{type:String},
  "size"      :{
    "height"    : {type: Number},
    "width"     : {type: Number}
  }
});

const fileModel = mongoose.model("File",FileModel);

module.exports = fileModel;