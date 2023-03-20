// All the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
    //Is there is any user who is logged in
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error","Campground not found in the database");
            res.redirect("back");
        }
        else
        {
            // If the user owns the campground or not
            // We will not use campground.author.id === req.user._id because the first one is an object and latter is a string
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("error","You don't have permission to do that");
                res.redirect("back");
            }
        }   
        });
    }
    else
    {
    req.flash("error","You need to be logged in to do that.")    
    res.redirect("back");
    }
}
middlewareObj.checkCommentOwnership = function(req,res,next)
{
    //Is there is any user who is logged in
    if(req.isAuthenticated())
    {
         Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err || !foundComment)
            {
                req.flash("error","Comment Not Found");
                res.redirect("back");
            }
            else
            {
                // If the user owns the comment or not
                // We will not use comment.author.id === req.user._id because the first one is an object and latter is a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do this.");
                    res.redirect("back");
                }
            }   
        });
    }
    else
    {
      res.redirect("back");
    }
}
//Middleware
middlewareObj.isLoggedIn = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;