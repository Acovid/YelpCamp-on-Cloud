var Campground = require('../models/campground');
var Comment = require('../models/comment');

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){ // if campground couldn't be found
                req.flash('error', 'Campground not found');
                res.redirect('back');
            } else {
                // if user owns the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    // otherwise if they don't own it, redirect back
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                } 
            }
        });
    } else {
        // if not, redirect somewhere
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){ // if comment couldn't be found
                res.redirect('back');
            } else {
                // if user owns the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    // otherwise if they don't own it, redirect back
                    req.flash('error', "You don't have permission to do that"); 
                    res.redirect('back');
                } 
            }
        });
    } else {
        // if not, redirect somewhere
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    };  
}

// middleware - check if user is logged in
middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){ 
        return next();
    }
    req.flash('error', "You need to be logged in to do that");
    res.redirect('/login');
}; 

module.exports = middlewareObj;