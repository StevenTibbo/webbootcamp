var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

router.get("/campgrounds", function(req,res){
     Campground.find({}, function(err,camps){
          if (err) console.log(err);
          else res.render("campgrounds/index",{campgrounds: camps});
     })
});

router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
     // get data from form and add to campground array
     // redirect back to campground 
     // var name=req.body.name;
     // var image=req.body.image;
     // var desc=req.body.description;
     // var newCamp={name: name, image: image, description: desc, author: {id: req.user._id,username:req.user.username}};
     // camps.push(newCamp);
     req.body.campground.author={id: req.user._id, username: req.user.username};
     Campground.create(req.body.campground, function(err, campground){
     if(err) console.log(err);
     else console.log(campground);
     })
     res.redirect("/campgrounds");
});

router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req,res){
     // Campground.findById(req.params.id, function(err,foundCamp){
     //      if(err) console.log(err);
     //      else {
     //           res.render("show",{camp:foundCamp});
     //           // console.log(foundCamp);
     //      }
     // });
     
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
          if(err) console.log(err);
          else {
               console.log(foundCamp);
               res.render("campgrounds/show",{camp:foundCamp});
          }
     });
});

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
     Campground.findById(req.params.id, function(err, foundCamp){
          if(err) console.log(err);
          else res.render("campgrounds/edit", {camp:foundCamp});  
     });
    
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
     Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatedCamp){
          if(err) console.log(err);
          else res.redirect("/campgrounds/"+updatedCamp._id);
     });     
});

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
     Campground.findByIdAndRemove(req.params.id,function(err,deletedCamp){
          if(err) res.redirect("/campgrounds");
          else res.redirect("/campgrounds");
     });  
});


module.exports=router;