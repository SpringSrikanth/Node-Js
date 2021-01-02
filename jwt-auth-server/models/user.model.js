//import mongoose
const mongoose = require('mongoose');

//import jsonwebtoken
const jwt =require('jsonwebtoken');

//imports secrets
const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = process.env;

//import token model obj
const Token = mongoose.model('Token');

//import bcrypt for salting and hasing user password
const bcrypt = require("bcryptjs");

//create user_schema obj
const userSchema = new mongoose.Schema({
	username:{type:String ,unique:true ,required:true },
	password:{type:String,required:true}
});

//create userSchema methods
userSchema.methods={
	//create createUserAccessToken method
	createUserAccessToken: async function(){
		try{
			let {_id,username}=this;
			let accessToken = jwt.sign(
					{user:{_id,username}},

					"ACCESS_TOKEN_SECRET",

					{
						expiresIn: "2m",
					}

				);
			return accessToken;
		}
		catch(err){
			console.error(err);
			return;
		}
	},

	//create createUserAccessToken method
	createUserRefreshToken: async function(){
		try{
			let {_id,username}=this;
			let refreshToken = jwt.sign(
					{user:{_id,username}},

					"REFRESH_TOKEN_SECRET",

					{
						expiresIn: "1d",
					}					
				);
			await new Token({token:refreshToken}).save();
			return refreshToken;
		}
		catch(err){
			console.log(err);
			return;
		}
	}
};


//user model pre hook function
userSchema.pre('save',async function(next){
	try{
		let salt = await bcrypt.getSalt(12);//generate salt from bcrypt
		let hashPassword =await bcrypt.hash(this.password, salt);//hash current user password
		this.password=hashPassword;//update user password with hash password
	}
	catch(err){
		console.error(err);
	}
	return next();
})

//add to module.exports
module.exports = mongoose.model('User',userSchema);