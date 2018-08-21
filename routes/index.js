var express = require('express')
    router = express.Router(),
    passport     = require('passport');

var User = require('../models/user')


router.get('/', function(req,res){
    res.redirect('/books');
});

//////////////////////////////////////////
//////////////AUTH ROUTES////////////////

/*  ----- SignUp / register ------ */

//Erased Register routes, as only with privilege is me
router.get('/register',function(req,res){
    res.render('register'); 
});
router.post('/register', function(req,res){
    var newUser = new User({username:req.body.username});
    //pass username, then password, then callback
    User.register(newUser, req.body.password ,  function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register')
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/books');
        });
    });
});


/*  ----- Login ------ */
router.get('/login', function(req,res){
    res.render('login')
});
//use of middleware for authentication
router.post('/login', passport.authenticate('local',{
    successRedirect: '/books',
    failureRedirect:'/login'
}) , function(req,res){

});

/*  ----- Logout ------ */
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/books')
});


module.exports = router;