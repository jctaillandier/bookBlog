var mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
    book:
    {   // Only keep pointers to Book ID
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book'
        }
    }, 
    author:
    {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    content: String,
    score: { type: Number, min: 18, max: 65 },
    created: { type: Date, default: Date.now }

});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;