var express = require("express");
//here mergeParams is used because the comments will get null id as it will be static because of the app.js page and that is why we have to use this
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comment New
router.get("/new",middleware.isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
       if(err)
       {
           console.log(err);
       }
       else
       {
        res.render("comments/new",{campground:campground});    
       }
    });
});
//Comment Create
router.post("/",middleware.isLoggedIn,function(req,res){
   //look for the campground using ID
   Campground.findById(req.params.id,function(err,campground){
      if(err)
      {
          console.log(err);
          res.redirect("/campgrounds");
      }
      else
      {
          Comment.create(req.body.comment,function(err,comment){
             if(err)
             {
                 console.log(err);
             }
             else
             {
                 //Add username and id in the commment
                 //Then save the comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success","Successfully added the comment");
               res.redirect('/campgrounds/' + campground._id);
             }
          });
      }
   });
});
//Comment Edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground) {
        if(err || !foundCampground)
        {
            req.flash("error","No Campground Found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            {
                req.flash("error","Something Went Wrong. Please Try Again!");
                res.redirect("back");
            }
            else
            {
                res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});
//Comment Update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err)
        {
            req.flash("error","Something Went Wrong. Please Try Again!");
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    });
});

// Comment Destroy Route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err)
      {
          req.flash("error","Something Went Wrong. Please Try Again!");
          res.redirect("back");
      }
      else
      {
          req.flash("success","Comment Deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});


module.exports = router;