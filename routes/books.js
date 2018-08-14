var express = require('express'),
    router = express.Router(),
    Book = require('../models/book'),
    User = require('../models/user');


    /// RESTFUL ROUTES ///

// INDEX route
router.get('/books', function(req,res){
    //passing reviewers in index.ejs
    
    Book.find({}, function(err, books){
        if(err){
            console.log('error loading from DB...')
        }
        else{
            res.render('books/index', {books:books});
        }
    });
     
});
// NEW route
router.get('/books/new',isloggedIn, function(req,res){
    res.render('books/new');
});
//CREATE route
router.post('/books', isloggedIn, function(req,res){
    Book.create(req.body.book, function(err, newBook){
        if(err){
            console.log('error creating new book review');
            console.log(err);
        }
        else{
            res.redirect('/books');
        }
    });
});
//SHOW route
router.get('/books/:id', function(req,res){
    
    Book.findById(req.params.id, function(err, theBook){
        if(err){
            res.redirect('/books')
        }
        else{
            res.render('books/show', {book:theBook});
        }
    });
   
});
//EDIT route
router.get('/books/:id/edit',isloggedIn, function(req,res){
    Book.findById(req.params.id, function(err, foundBook){
        if(err){
            res.redirect('/');
        }
        else{
            res.render('books/edit', {book: foundBook});
        }
    });
});
//UPDATE route
router.put('/books/:id',isloggedIn, function(req,res){
    Book.findByIdAndUpdate(req.params.id, req.body.book ,function(err, foundBook){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/books/' + req.params.id);
        }
    });
});
// DELETE route
router.delete('/books/:id',isloggedIn, function(req,res){
        
        Book.findByIdAndRemove(req.params.id, function(err, foundBook){
            if(err){
                console.log('could not delete from DB...')
                res.redirect('/')
            }
            else{
                res.redirect('/');
            }
        });
});

function isloggedIn(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.username == 'jc.taillandier'){
            return next();
        }
        else{
            res.redirect('/books')
        }
    }
    else{
        res.redirect('/books')
    }
}

module.exports = router;