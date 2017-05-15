var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
     console.log(req.params.id);
     Campground.findById(req.params.id, function(err,campground){
          if(err) console.log(err);
          else {
               res.render("comments/new",{campground:campground});
          }
     });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
     Campground.findById(req.params.id,function(err,campground){
          if(err) {
               console.log(err);
               res.redirect("/campgrounds");
          }
          else{
               Comment.create(req.body.comment,function(err,comment){
                    if(err)console.log(err);
                    else{
                         console.log(req.user);
                         comment.author.id=req.user._id;
                         comment.author.username=req.user.username;
                         comment.save();
                         campground.comments.push(comment);
                         campground.save();
                         res.redirect("/campgrounds/"+campground._id);
                    }
               });
          }
     })
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
     Campground.findById(req.params.id,function(err,campground){
          if(err)console.log(err);
          else{
               Comment.findById(req.params.comment_id,function(err,comment){
                    if(err) console.log(err);
                    res.render("comments/edit",{campground:campground, comment:comment});
               });               
          }
     });
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
          if(err) res.redirect("back");
          else res.redirect("/campgrounds/"+req.params.id);
     });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
     Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedcomment){
          if (err) res.redirect("back");
          else res.redirect("/campgrounds/"+req.params.id);
     });
});


module.exports=router;