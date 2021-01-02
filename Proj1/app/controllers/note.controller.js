//import note model
const Note =require('../model/note.model.js');

//create note
exports.save = (req,res)=>{

	//validate request 
	if(!req.body.content){
		return res.status(400).send({
			message:"note content can't be empty"
		})
	}

	//creating note
	const note=new Note({
		title:req.body.title || 'Untitled Note',
		content: req.body.content
	})

	// to save note in db
	note.save().then(data=>{
		res.send(data);
	}).catch(err=>{
		res.status(500).send(
			{ 
				message:err.message || "something went wrong!!! with saving note"
			}

		);
	})

};


//get All notes
exports.findAll = (req,res)=>{
	Note.find().then(notes=>{
		res.status(200).send(notes);
	}).catch(err=>{
		res.status(500).send(
			{ 
				message:err.message || "something went wrong!!! with get all notes"
			}

		);
	})

};


//get note
exports.findOne = (req,res)=>{
    Note.findById(req.params.noteId).then(note=>
    {
    	if(!note){
    		return res.status(400).send({
    			message:"note not found with note Id"+req.params.noteId
    		})
    	}

    	res.send(note);
    }).catch(err=>{
    	if(err.kind =='ObjectId'){
    		return res.status(400).send({
    			message: err.message || "Note not found with noteID"
    		})
    	}

    	return res.status(500).send({
    			message: err.message || "Some thing went wrong with get single note"
    		})
    })
};


//update note
exports.update = (req,res)=>{

	if(!req.body.content){
		return res.status(400).send({
			message: "note content not empty"
		})
	}

	Note.findByIdAndUpdate(req.params.noteId,
			{
				title:req.body.title || "Untitled note",
				content:req.body.content
			},{new:true})
			.then(note=>{
				if(!note){
					return res.status(400).send({
						message: "note not found with noteId"
					})
				}
				res.send(note);

			}).catch(err=>{
				if(err.kind=='ObjectId'){
					return res.status(400).send({
						message:err.message || "Note not found with noteID "+req.params.noteId
					})
				}
				return res.status(500).send({
					message: err.message || "Some thing went wrong with updating note "+req.params.noteId
				})
	       })

};





//save note
exports.delete = (req,res)=>{
	Note.findByIdAndRemove(req.params.noteId)
	.then(note=>{
		if(!note){
			return res.status(400).send({
				message:"Note not found with nOteId" +req.params.noteId
			})
		}
		res.send({message:"Note deleted successfully with noteId  " +req.params.noteId});

	}).catch(err=>{
		if(err.kind =='ObjectId' || err.name == 'NotFound'){
			return res.status(400).send({
				message:"Note not found with nOteId" +req.params.noteId
			})
		}
		return res.status(500).send({
				message:"Error with deleting nOteId" +req.params.noteId
			})
	})

};






