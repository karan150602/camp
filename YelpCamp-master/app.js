var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
    // seedDB = require("./seeds");
//Requiring routes
    var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");
        
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://Jasbir:Jasbir98@ds163480.mlab.com:63480/jasbiryelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//This is the middleware for passing currentuser to every single route
// Here __dirname tells us the current directory in which this file resides.
//seedDB();//Seed the database with some data to work with.
//Passport Configuration

app.use(require("express-session")({
    secret:"This is going to be legendary",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); 
});
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The YelpCamp Server has Started!!"); 
});