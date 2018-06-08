var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require('connect-flash'),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require('method-override');
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// requiring routes
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require('./routes/index');

// url holds connection to the db, either via environment variable on Cloud
// or as a name of the local DB. On IBM Cloud, this is a user defined environment
// variable in the app's runtime, it looks like this:
// variable: DATABASEURL
// value: (path to the DB as provided by the DB host )
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v4";

mongoose.connect(url); // Connect to mongodb

//instruct express to use body parser
app.use(bodyParser.urlencoded({extended: true})); 
// eliminate the need to write extension .ejs to template names (i.e. landing.ejs)
app.set("view engine", "ejs"); 
// connect to directory with stylesheets 
app.use(express.static(__dirname + "/public")); //dirname is current dir of this file
app.use(methodOverride('_method')); // use method override
app.use(flash()); // use connect-flash

// seedDB(); // empty the db and seed it with 3 camps

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Zira is still the cutest cat ever',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass current user to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
 
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// Start listening on port - either on Cloud or locally on 3000
var port = process.env.PORT || 3000
app.listen(port, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started at port " + port);
 });

 