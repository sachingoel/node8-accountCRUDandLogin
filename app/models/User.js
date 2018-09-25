'use Strict'
const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

var addressSubSchema = {
	"address1"	: String,
	"address2"	: String,
	"city"		  : String,
	"state"		  : String,
	"country"	  : String,
	"zipcode" 	: Number
}
const UserModel = new Schema({
	"id"					:{type:String,required:true,index:{unique:true}},
	"firstName"		:{type:String },
	"lastName"		:{type:String},
	"email"			  :{type:String},
	"password"		:{type:String},
	"mobileNumber":{type:String},
	"address"		  :addressSubSchema,
	"created_on"	:{type: Date,default: Date.now()},
	"modified_on"	:{type: Date},
	"isVerified"	:{type:Boolean,default:false},
	"google":{
		"token"				:{type:String},
		"email"				:{type:String}
	},
	"facebook":{
		"token"				:{type:String},
		"email"				:{type:String}
	}
	
});

const User = mongoose.model("User",UserModel);

module.exports = User;