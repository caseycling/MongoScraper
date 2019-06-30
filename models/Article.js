var mongoose = require("mongoose");

//Save reference to Schema constructor
var Schema = mongoose.Schema;

//Create ArticleSchema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

//Save model to a variable
var Article = mongoose.model("Article", ArticleSchema)

//Export model
module.exports = Article