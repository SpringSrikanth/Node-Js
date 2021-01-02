//import express lib
const express=require('express');


//import body parser
const bodyParser=require('body-parser');


//creating express app
const  app= express();

//add dbconfig file in server.ts
const dbConfig = require('./app/config/database.config.js');


//add mongoose lib
const mongoose = require('mongoose');

mongoose.Promise=global.Promise;


mongoose.connect(dbConfig.url,{
	useNewUrlParser:true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("connected to mongo db successfully");
}).catch((err)=>{
	console.log("failed to connect with mongo db  "+err);
	process.exit();
})

//parse request of content-type --application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));


//parse request of content-type application/json
app.use(bodyParser.json());


//define simple route
app.get('/',(req,res)=>{
	console.log("hitting / route");
	res.json({"message":"health is good"});
});


//add notes route 
require('./app/routes/note.route.js')(app);


app.listen(3000,()=>{
	console.log("Server listening on port no: 3000");
})

