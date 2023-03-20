var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//Since whenever we require a directory it acquires index.js inside it
//Campground Page : INDEX ROUTE- Display all the campgrounds in DB
router.get("/",function(req,res){
    var noMatch = null;
    if(req.query.search)
    {
        
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name:regex},function(err,allCampgrounds){
       if(err)
       {
           console.log(err);
       }
       else{
           if(allCampgrounds.length < 1)
           {
               noMatch = "No Campgrounds match that query, Please try again.";
           }
           res.render("campgrounds/index",{campgrounds:allCampgrounds,noMatch: noMatch});   
       }
    });
    }
    else
    {
    //Get all the campgrounds from DB and then render the file
        Campground.find({},function(err,allCampgrounds){
           if(err)
           {
               console.log(err);
           }
           else{
               res.render("campgrounds/index",{campgrounds:allCampgrounds,noMatch: noMatch});   
           }
        });
    }
});

//Creating Post request for Campground posting and also this is a convention to name the routes same for get and post
//CREATE ROUTE which adds new campground to the DB
router.post("/",middleware.isLoggedIn,function(req,res){
   //get data from from and add it to the campground array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var price = req.body.price;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name:name,price:price,image:image,description:description,author:author};
   //Create a new Campground and Save it to DB
   Campground.create(newCampground,function(err,newlyCreated){
      if(err)
      {
          console.log(err);
      }
      else
      {
          //Redirect back to the campground page
          res.redirect("/campgrounds");
      }
   });
//   campgrounds.push(newCampground);
   
});

//NEW ROUTE : To display form to make new campground
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW ROUTE : To show more info about one campground when clicked
router.get("/:id",function(req, res) {
    //Find the campground with required ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error","Campground not found");
            res.redirect("back");
        }
        else
        {
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    // render show template of the required campground
});

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
       res.render("campgrounds/edit",{campground:foundCampground}); 
    });
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
//   find and update the current campground 
Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err,updatedCampground){
   if(err)
   {
       res.redirect("/campgrounds");
   }
   else
   {
     res.redirect("/campgrounds/" + req.params.id);  
   }
});
//  redirect it to the show page
});
//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err)
      {
          res.redirect("/campgrounds");
      }
      else
      {
          res.redirect("/campgrounds");
      }
   });
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
