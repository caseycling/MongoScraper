var mongoose = require("mongoose");

//Reference to schema constructor 
var Schema = mongoose.Schema;

//Create NoteSchema object
var NoteSchema = new Schema({
    body: String
});

//Save model to variable
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;