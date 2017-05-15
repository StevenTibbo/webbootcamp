var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comment")

middlewareObj.checkCampgroundOwnership=function (req,res,next){
     if(req.isAuthenticated()){
          Campground.findById(req.params.id,function(err, foundCamp){
               if(err) res.redirect("back");
               else{
                    console.log(foundCamp.author.id);
                    console.log(req.user._id);
                    if(foundCamp.author.id.equals(req.user._id)){
                         return next();
                    }
                    else res.redirect("back");
               }
          });
     }
     else res.redirect("back");
}

middlewareObj.checkCommentOwnership=function (req,res,next){
     if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id,function(err, foundComment){
               if(err){
                    req.flash("error", "Campground not found")
                    res.redirect("back");   
               } 
               else{
                    if(foundComment.author.id.equals(req.user._id)){
                         return next();
                    }
                    else {
                         req.flash("error", "You don't have permission to do that")
                         res.redirect("back");
                    }
               }
          });
     }
     else{
          req.flash("error", "Please login First!")
          res.redirect("back");
     } 
}

middlewareObj.isLoggedIn=function(req, res, next){
     if(req.isAuthenticated()){
          return next();
     }
     req.flash("error", "Please login First!")
     res.redirect("/login/?origin="+req.url);
}

module.exports=middlewareObj