var mongoose = require('mongoose');


var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    yearPublish: String,
    review: String,
    score: {type:Number, max:10, min:0}
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;