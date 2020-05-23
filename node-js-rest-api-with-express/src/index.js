// root file for this project
// mongodb+srv://root:tiger@cluster0-qis7v.gcp.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import from module
const authRoutes = require('./routes/authRoutes')

const app = express();

//convert our request data to json using body-parser
app.use(bodyParser.json());
//incldue routes with app using app.use
app.use(authRoutes);

const mongoDbUri = 'mongodb+srv://root:tiger@cluster0-qis7v.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDbUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})// to connect mongo database
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb successfully');
})// after connected to the database it will shown

mongoose.connection.on('error',(err)=>{
    console.error('error in mongo connection ',err)
})// if any error  in connection the error will shown

app.get('/',(req,res) => {
    res.send('Hi Srikanth Yenagandula');
})


//set port to the app server
app.listen(1122,()=>{
console.log('listening on port 1122');
})