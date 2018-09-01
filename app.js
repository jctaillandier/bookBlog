var bodyparser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    passport     = require('passport'),
    User         = require('./models/user'),
    LocalStrategy= require('passport-local'),
    methodOverride = require('method-override');

expressSanitizer = require('express-sanitizer')
app = express(); 
    
var url = process.env.DATABASEURL || "mongodb://localhost/book_blog";
mongoose.connect(url);


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


 //app.listen(process.env.PORT, process.env.IP);
 app.listen(3000, function(){
     console.log('listening at 3000');
 });
