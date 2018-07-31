var mongoose = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    reviewedBooks:[ //Array of books that he reviewed + content of review + Date of review
        {   // Only keep pointers to Review ID
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Review'
            }
        },        
    ],
    readingList:[ //Array of books that he wants to read
        {   // Only keep pointers to Book ID
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Book'
            }
        }
    ],
});

//takes care or all auth methods for user
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;