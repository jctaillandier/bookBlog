var bodyparser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    methodOverride = require('method-override');

expressSanitizer = require('express-sanitizer')
app = express(); 
    
mongoose.connect('mongodb://localhost/book_blog');
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(expressSanitizer())

var Book = require('./models/book');
var User = require('./models/user')

//require ROUTES
var index = require('./routes/index'),
    books = require('./routes/books')

///////////////////////////////////////////
 
// Book.create({
//     title: 'Manufacturing Consent',
//     author: 'Noam Chomsky',
//     image: 'https://images.gr-assets.com/books/1525166345l/12617.jpg',
//     yearPublish: '2002',
//     reviewer:[]
//  });

////////////////////////////////////

app.use(index);
app.use(books);

var myport = 3000;
app.listen(myport, function(){
    console.log('Listening on port ' + myport);
});
