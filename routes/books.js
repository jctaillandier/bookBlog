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
            res.render('index', {books:books});
        }
    });
     
});
// NEW route
router.get('/books/new', function(req,res){
    res.render('new');
});
//CREATE route
router.post('/books', function(req,res){
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
            res.redirect('/blogs')
        }
        else{
            res.render('show', {book:theBook});
        }
    });
   
});
//EDIT route
router.get('/books/:id/edit', function(req,res){
    Book.findById(req.params.id, function(err, foundBook){
        if(err){
            res.redirect('/');
        }
        else{
            res.render('edit', {book: foundBook});
        }
    });
});
//UPDATE route
router.put('/books/:id', function(req,res){
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
router.delete('/books/:id', function(req,res){
    //if (confirm('Are you sure you want delete this blog post?')) {
        
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

module.exports = router;