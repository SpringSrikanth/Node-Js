//it will access all requests and check the token is valid or not
//import jwt
const jwt = require('jsonwebtoken');
//import mongoose
const mongoose= require('mongoose');
//import user
const User = mongoose.model('User');

module.exports=(req,res, next)=>{
	//get authorization  from headers in request obj
	const {authorization} = req.headers;
	if(!authorization){
		return res.status(403).send({"message":"Token is required"});
	}

	//remove bearer token from headers
	const token = authorization.replace("Bearer ",'');

	//verifying token for every request
	jwt.verify(token,"MY_SECRET_KEY_koseksi_pachipulusula",async (err,payload) => {
		if(err){
			//if incase any error related to token 
			return res.status(401).send({"message":"Please login!"});
		}
		const {UserId} = payload;//get user id from jwt payload
		//console.log(payload);
		const user =  await User.findById(UserId);//get user info by userId
		//console.log(user);
		req.user= user; //store user info in request object for future ref
		next();//to process the request
	});

}