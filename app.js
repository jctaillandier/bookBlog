var bodyparser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    passport     = require('passport'),
    User         = require('./models/user'),
    LocalStrategy= require('passport-local'),
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
var User = require('./models/user');

//require ROUTES
var index = require('./routes/index'),
    books = require('./routes/books');

///////////////////////////////////////////
// Book.create({
//     title:'Hello World',
//     author:'Paul George',
//     image:'',
//     yearPublish: '2012',
//     review:'And do I need to state the obvious? I was not here. You put on a long sleeve shirt and cover those track marks on your arm. Count down from twenty, and then you dial. Hang tough, you\'re in the home stretch. Hello, Walter. You\'re never gonna pay \'em off, what\'s the point',
//     score:8
// })

///////PASSPORT CONFIGURATION///////
app.use(require('express-session')({
    secret:'whatever else maybe for potato velociraptor',
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
////////////////////////////////////////////

////////////////////////////////////


//Middleware that will run for everysingle code
// to send currentUser var all the time
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(index);
app.use(books);

var myport = 3000;
app.listen(myport, function(){
    console.log('Listening on port ' + myport);
});
