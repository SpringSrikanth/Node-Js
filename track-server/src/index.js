//adding models
require('./models/User.js');
require('./models/Track.js');

//import requireAuth
const requireAuth = require('./middlewares/requireauth.js');

//import express
const express =require('express');

//import body-parser
const bodyParser = require('body-parser');

//import authroutes file
const authRoute =require('./routes/authroutes.js');

//import track routes 
const trackRoute = require('./routes/trackroutes.js');

//import mongoose
const mongoose = require('mongoose');

//create app this root one for whole project
const app =express();

//add bodyParser.json() before adding authRoute
app.use(bodyParser.json());

//add authroutes in app
app.use(authRoute);

//add trackroutes in app
app.use(trackRoute);

//mongodb uri
const mongoUri = 'mongodb+srv://user_123:tools@cluster1.yis5u.mongodb.net/test?authSource=admin&replicaSet=atlas-22fgfj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

//const mongoUri = "mongodb://localhost:27017/mydb";

//connecting to mongo database using mongoose
mongoose.connect(mongoUri, {
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true
});

//checking connection is established or not 
mongoose.connection.on('connected' , ()=>{
	console.log('mongodb connection established');
});

mongoose.connection.on('error',(err)=>{
	console.error('mongodb connection not established' +err);
});


//create empty route
app.get('/', requireAuth,(req,res)=>{
	//console.log(req);
	res.send("Hi There")
});

//connecting to mongo database

app.listen(3000,()=>{
	console.log('App listening on port 3000');
})