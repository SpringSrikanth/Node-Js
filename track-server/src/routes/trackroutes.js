//import expres 
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//get model from mongoose
const Track = mongoose.model('Track');

//import middleware 
const requireAuth = require('../middlewares/requireauth.js');

//creating router
const router = express.Router();

//add middleware in router
router.use(requireAuth);

//get all tracks
router.get('/tracks',async (req, res)=>{
	const user=req.user;
	//console.log(user)
	const tracks = await Track.find({userId: req.user._id});
	res.status(200).send({tracks})
})

//create track
router.post('/tracks',async(req, res)=>{
	const {name ,locations} = req.body;
	
	if(!name || !locations){
		return res.status(401).send({"message": "name and locations must be specified"});
	}
	const track = new Track({
		name,locations,userId:req.user._id
	})

	try{
		await track.save();
		res.status(201).send({track})
	}
	catch(err){
		res.status(422).send({message: err.message});
	}
})

//adding router in module.exports
module.exports =router;