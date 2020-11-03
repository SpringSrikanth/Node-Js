//import jsonwebtoken
const jwt = require('jsonwebtoken');

//import accessTokenSecret from env
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//every request is come for middleware to authenticate every request
exports.checkAuth=(req,res,next)=>{
	//to get token from request
	const token = req.get('x-auth-token');

	//check token is there or not in request
	if(!token){
		res.status(404).send({message: 'Token missing!'});
	}
	else{
		try{
			//if token is valid get the user object from authtoken
			const payload = jwt.verify(token,accessTokenSecret);
			//set user to request object
			req.user= payload.user;
			//to process further
			next();
		}
		catch(err){
			//checking token expired error
			if(err.name==="TokenExpiredError"){
				return res.status(422).send({message:" Session expired please try again! and Login Again" ,error:err.message});
			}
			//checing JsonWebTokenError
			else if(err.name==="JsonWebTokenError"){
				return res.status(422).send({message:" Invalid Token pleae login again",error:err.message});
			}
			//checing error conditions
			else{
				return res.status(402).send({message:"please Login again" ,error:err.message});
			}
		}
	}
};