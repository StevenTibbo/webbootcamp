var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function(req, res){
     res.render("landing");     
});

router.get("/register", function(req,res){
     res.render("register");     
});

router.post("/register",function(req,res){
     var newUser=new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
          if(err){
               req.flash("error",err.message);
               return res.render("register");
          }
          passport.authenticate("local")(req, res, function(){
               res.redirect("/campgrounds")
          });
     });
});

router.get("/login",function(req,res){
     console.log(req.query.origin);
     res.render("login",{origin: req.query.origin});
});

// router.post("/login",passport.authenticate("local",
//      {
//           successRedirect: "/campgrounds",
//           failureRedirect: "/login"
//      }),function(req,res){
// });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash("success", "Welcome to YelpCamp "+user.username);
      if (!req.body.origin)  return res.redirect('/campgrounds');
     else return res.redirect(req.body.origin);
    });
  })(req, res, next);
});

router.get("/logout",function(req,res){
     req.logout();
     req.flash("success", "You are logged out!")
     res.redirect("/campgrounds");
});

module.exports=router;