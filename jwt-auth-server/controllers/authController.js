//import mongoose
const mongoose = require('mongoose');
//import user model
const User = mongoose.model('User');
//improt token model
const Token =  mongoose.model('Token');
//import express
const express =require('express');
//import jsonwebtoken
const jwt = require('jsonwebtoken');
//import secrets from env
const {REFRES_TOKEN_SECRET,ACESS_TOKEN_SECRET} = process.env;


//create signup route
exports.signup =async (req,res)=>{
	//get userobj details form req.body
	const {username,password} = req.body;
	try{
		//check if user existed with username
		let user = await User.findOne({username});
		//check if user is there or not in database
		if(user){
			return res.status(402).send({message:"User already exists with username " +username});
		}

		else{
			//store user inside database
			user = await new User({username,password}).save();

			//create accessToken
			let accessToken =await user.createUserAccessToken();
			//create createUserAccessToken
			let refreshToken =await user.createUserRefreshToken();

			//send accessToken and refreshToken back to the user
			return res.status(201).send({accessToken,refreshToken});


		}
	}
	catch(err){
		return res.status(500).send({message:'Internal Server Error'});
	}

}

//creating login controlelr method
exports.login = async (req,res) => {
	//get username and password from req.body
	const {username,password} = req.body;
	try {
		//check if username and password are exists
		if(!username){
			return res.status(402).send({message:'Usernaem is not empty'});
		}
		if(!password){
			return res.status(402).send({message:'Password is not empty'});
		}
		//get user object form database
	 	let user = await User.findOne({username});
	 	//check if user exists or not
	 	if(!user){
	 		return res.status(402).send({message:'User not found with username'});
	 	}

	 	else{
	 		//compare passwords
	 		let valid =bcrypt.compare(password,user.password);
	 		//if valid generate accessToken and responce token
	 		if(valid){
	 			let accessToken = await user.createUserAccessToken();
	 			let refreshToken = await user.createUserRefreshToken();

	 			res.status(200).send({message:"User login successful",accessToken,refreshToken})
	 		}
	 		else{
	 			res.status(403).send({message:"Invalid password"});
	 		}
	 	}
	}
	catch(err){
		console.log(err);
		res.status(500).send({message:'Internal Server Error'});
	}
}


exports.generateAccessTokenFromRefreshToken =async (req,res) => {
	try{
		//get refresh token
		const {refreshToken} = req.body;
		//check if refresh token is there or not
		if(!refreshToken){
		   return res.status(404).send({message:'Refresh token not found'});
		}
		else{
			//query to check if token is valid
			const tokenDoc =await Token.findOne({token:refreshToken});
			//check token exist or not in database
			if(!tokenDoc){
				return res.status(422).send({message:'Refresh token not found'});
			}
			else{
				//extract payload from refresh token and generate Access Token
				const payload=jwt.verify(tokenDoc.token,REFRES_TOKEN_SECRET);
				//create accessToken 
				const accessToken = jwt.sign(
					{user:payload},
					ACCESS_TOKEN_SECRET
					,{
						expiresIn: "10m",
					}
					);
				//return access token 
				return res.status(200).send({accessToken});
			}

		}


	}
	catch(err){
		console.error(err);
		res.status(500).send({message:'Internal Server Error'});
	}
}


//create logout controlelr method
exports.logout =async (req,res) => {
	try {
	//get refresh token from body
	const {refreshToken} = req.body;
	//Delete Token from database
	await Token.findOneAndDelete({token:refreshToken});
	//send responce to server
	res.status(201).send({message:'User logged out successful'});

	}
	catch(err){
		console.error(err);
		return res.status(500).send({message:'Internal Server Error'});
	}

}