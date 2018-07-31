var mongoose = require('mongoose');


var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    yearPublish: String,
    reviewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;