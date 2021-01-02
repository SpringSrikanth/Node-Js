//import mongoose
const mongoose = require('mongoose');

//import bcrypt
const bcrypt = require('bcrypt');

//creating user Model
const userSchema = new mongoose.Schema({
	email: {
		type: 'string',
		unique: true,
		required: true
	},
	password: {
		type: 'string',
		required:true
	}
});


//creating pre save hook in userschema
userSchema.pre('save',function(next){
	//will get user obj
	const user = this;
	//checking user password is modified
	if(!user.isModified('password')){
		return next();
	}

	bcrypt.genSalt(10,(err,salt)=>{
		if(err){
			return next(err);
		}
		//creating Hash bcrypt with salt 
		bcrypt.hash(user.password,salt,(err,hash)=>{
			if(err){
				return next(err);
			}
			user.password = hash;//change userdefined password to hash
			next();// to process save function;
		})
	})

})

//creating comparePassword method in userSchema
userSchema.methods.comparePassword = function(candidatePassword){
	const user=this;
	//creating Promise for checking user password
	return new Promise((resolve,reject)=>{
		bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
			if(err){
				return reject(err);
			}
			if(!isMatch){
				return reject(false);
			}
			resolve(true);
		});
	})
}


//add userSchema inside mongoose because mongoose internally connect with mongoDb
mongoose.model('User',userSchema);


