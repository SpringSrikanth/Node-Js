// import express
const express = require('express');

//create router
const router = express.Router();

//import middleware
const Middleware = require('../middlewares');

//import controllers
const authController = require('../controllers/authController.js');


// @route POST /api/auth/signup
router.post('/auth/signup',authController.signup);

// @route POST /api/auth/login
router.post('/auth/login',authController.login);

// @route POST /api/auth/refershtoken
router.post('/auth/refershtoken',authController.generateAccessTokenFromRefreshToken);

// @route POST /api/auth/logout
router.delete('/auth/logout',authController.logout);


//@route get /api/auth/signup
//@access only authenticated users can access this endpoint
router.get('/auth/protected',Middleware.checkAuth,(req,res)=>{
	res.status(200).send({message:"Protected"});
});


//add to module.exports
module.exports = router;