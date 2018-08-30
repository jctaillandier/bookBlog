var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    yearPublish: String,
    review: String,
    created: { type: Date, default: Date.now },
    score: {type:Number, max:10, min:0}
});

bookSchema.plugin(mongoosePaginate);
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;