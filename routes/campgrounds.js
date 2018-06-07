var express     = require('express'),
    router      = express.Router(),
    Campground  = require('../models/campground'),
    middleware  = require('../middleware'); // will automatically require file index.js in that directory

// INDEX route - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user}); 
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE route - add new campgrounds to DB 
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image; 
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //object with new campground
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}; 
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else { 
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});
// end of CREATE route

//NEW route - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
// end of NEW route

//SHOW route - show details about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{ 
            console.log("foundCampground");
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE - THE FORM
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
    // redirect somewhere (show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');            
        }
    });
});

module.exports = router;