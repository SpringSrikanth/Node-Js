//import express
const express =require('express');

//import mongoose lib
const mongoose = require('mongoose');

//import user model
const User = mongoose.model('User');

//import jwt
const jwt = require('jsonwebtoken');

//create router
const router =express.Router();

//create signup request
router.post('/signup',async(req,res)=>{
	const {email,password} = req.body;
	try{
	const user = new User({email,password});
	await user.save();
	const token = jwt.sign({"UserId":user._id,"EmailId":user.email},"MY_SECRET_KEY_koseksi_pachipulusula");
	res.send({"message":"user created successfully" ,token});	
	}
	catch(err){
		console.log(err);
		res.status(422).send({"message": err.message,"errcode":err.code});
	}
	
})


//create signin route
router.post('/signin',async (req,res)=>{
	const {email,password} = req.body;
	//checking email and password is there or not
	if(!email || !password){
		return res.status(401).send({"message":"email and password required"});
	}

	const user =await User.findOne({email});
	// checking user is there or not with the mentioned email
	if(!user){
		return res.status(422).send({"message":"User not found with the mentioned email id"});
	}
	try{
		await user.comparePassword(password);
		const token= jwt.sign({"UserId":user._id,"EmailId":user.email},"MY_SECRET_KEY_koseksi_pachipulusula");
	    res.send({"message":"user signed in successfully" ,token});	
	}
	catch(err){
		return res.status(422).send({"message":"error with the email and password"})
	}
})



//added to exports module
module.exports =router;