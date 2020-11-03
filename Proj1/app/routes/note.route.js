//create separate routes for note schema
module.exports = (app) =>{


 //Adding notes controller in this note.routes.js file
 const notes= require('../controllers/note.controller.js')

 //Creating a note
 app.post('/notes/save', notes.save)

 //fetch all notes
 app.get('/notes/all', notes.findAll)


 //Get Single Note using noteID
 app.get('/notes/:noteId',notes.findOne)

 //Update Note using noteID
 app.put('/notes/:noteId',notes.update)


 //Delete Note using noteID
 app.delete('/notes/:noteId',notes.delete)

}