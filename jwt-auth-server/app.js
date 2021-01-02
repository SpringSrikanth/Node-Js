//entry for every poject
require('./models/token.model.js');
//import models
require('./models/user.model.js');


//requrie dotenv for gettting refreshToken secret and accessToken secret
require('dotenv').config();

//import body-parser
const bodyParser = require('body-parser');

//import mongoose
const mongoose = require('mongoose');

//import express
const express = require('express');

//import cors
const cors = require('cors');

//route path for whole application
const app =express();

//import routes
const api = require('./routes');

//connect with mongoDb using mongoose
mongoose.connect('mongodb://localhost:27017/mydb',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
},()=>{
	console.log("mongodb connected successfully");
},(err)=>{
	console.log("mongodb connection error: " + err);
})

//add body-parser to app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

//enabling cors
app.use(cors());

//enabling routes
app.use('/api',api);


//checking with normal rest call
app.get('/',(req,res)=>{
	res.status(200).send({message:"success"});
});

//app listen to start the service
app.listen(4000,()=>{
	console.log('app listening on port 4000');
});

