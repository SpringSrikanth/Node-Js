//import mongoose object
const mongoose = require('mongoose');

//create tokenSchema object	
const tokenSchema =new mongoose.Schema({
	token:{ type : String }
});

//add tokenSchema to module.exports object
module.exports = mongoose.model('Token',tokenSchema);