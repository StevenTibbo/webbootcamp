var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment");
var User=require("./models/user");
var methodOverride=require("method-override")
var commentRoutes=require("./routes/comment"),
     campgroundRoutes=require("./routes/campgrounds"),
     indexRoutes=require("./routes/index");
var flash=require("connect-flash");
// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");


// "Campground" will be used for collections name in mongodb, it be will be automatically changed to "campgrounds"

// var camps=[
//      {name: "Salmon Creek", image: "https://p1fmzg.by3301.livefilestore.com/y4mKXkmqdX8JJfnWIJSaL8QUC1vPzm4KH7ysth9im3_OoKG6Q9HojHwxCJruynziSP3eFgJCXJqia7PisPQdMNL8kpS27NYZPofUXwo_pU3D9RAX9ITfTRqzF3UOhcMtPeffk96AFvNYQc94lhj8cHvlmc9Ezn3omW9dRi4ryY5lD3btuyjnezTziJF3TpE9fJ7VwByWDGAAX-9o5rh6XnmoQ?width=3264&height=1836&cropmode=none"},
//      {name: "Granite Hill", image: "https://rfghyw.by3301.livefilestore.com/y4mBUR_frYbb80pKsF-cNaYLMKizrVEAe7KWdUkF9F6N0CD4_c-4kdtFSTX2pqxBWs_Nsq55fhHt6TGHyoGl3xTJno2nKSwGmIVyYO_sHhEi3-wCiHooClQsbD4UuYAI2L9wtsCAAkK41iYp1Qpf1M4qBCHxnpyqy3pXmTjUiHbZHqNGB3uD0G3C7TtEo9ckIojrjh6v2oO5J6h-60EszivxQ?width=2560&height=1920&cropmode=none"},
//      {name: "Mountain Goat's Rest", image: "https://qfe1qa.by3301.livefilestore.com/y4mNEgt4SdndJx6cg1Bc6lXhIF0cy9eMV1UDkiicCmOKuEO0-5c6AuspOHN9rcjjnpVVZmPuPzuywwsFnoi9G9eF41EC3N9-aOzQB4hNl-v6uBLRXyRVYQlieJFsTUGjMlTtCH80x7-K2NBVZqUxc53EEk4bAI4Wa4MP1lZqjo_BaSYFYrum7bYhC0tEIRE5phRs-PN8kAZrmrDuKsHTkGDpw?width=3264&height=2448&cropmode=none"},     
//      {name: "Salmon Creek", image: "https://p1fmzg.by3301.livefilestore.com/y4mKXkmqdX8JJfnWIJSaL8QUC1vPzm4KH7ysth9im3_OoKG6Q9HojHwxCJruynziSP3eFgJCXJqia7PisPQdMNL8kpS27NYZPofUXwo_pU3D9RAX9ITfTRqzF3UOhcMtPeffk96AFvNYQc94lhj8cHvlmc9Ezn3omW9dRi4ryY5lD3btuyjnezTziJF3TpE9fJ7VwByWDGAAX-9o5rh6XnmoQ?width=3264&height=1836&cropmode=none"},
//      {name: "Granite Hill", image: "https://rfghyw.by3301.livefilestore.com/y4mBUR_frYbb80pKsF-cNaYLMKizrVEAe7KWdUkF9F6N0CD4_c-4kdtFSTX2pqxBWs_Nsq55fhHt6TGHyoGl3xTJno2nKSwGmIVyYO_sHhEi3-wCiHooClQsbD4UuYAI2L9wtsCAAkK41iYp1Qpf1M4qBCHxnpyqy3pXmTjUiHbZHqNGB3uD0G3C7TtEo9ckIojrjh6v2oO5J6h-60EszivxQ?width=2560&height=1920&cropmode=none"},
//      {name: "Mountain Goat's Rest", image: "https://ekqhna.by3301.livefilestore.com/y4mDmrXhZwHIoUyoN_Qd07KHsfktKqU8rka-PaaYDHz0AR9dqHD24cKnomOt3T12eJASrP9UW9hK9jZTwfzdHfD0vsdspX7HwBw7MMEeglyU2Z6BEsKUcBmtXZO8E8WWRmp6EUJ2WXr_JHLXNETnYWiNC2wdCwNNOkDHAWGumDMOBL9bkOBHF0xz3_2jLxNBCgZ7xwFpo3H5obBtLtm25Hziw?width=3492&height=4656&cropmode=none"}

//      ];
// Campground.create(camps, function(err, campground){
//      if(err) console.log(err);
//      else console.log(campground);
// });

// Campground.create({name: "Salmon Creek", 
// image: "https://p1fmzg.by3301.livefilestore.com/y4mKXkmqdX8JJfnWIJSaL8QUC1vPzm4KH7ysth9im3_OoKG6Q9HojHwxCJruynziSP3eFgJCXJqia7PisPQdMNL8kpS27NYZPofUXwo_pU3D9RAX9ITfTRqzF3UOhcMtPeffk96AFvNYQc94lhj8cHvlmc9Ezn3omW9dRi4ryY5lD3btuyjnezTziJF3TpE9fJ7VwByWDGAAX-9o5rh6XnmoQ?width=3264&height=1836&cropmode=none",
// description: "new a campground"
// }, function(err, campground){
//      if(err) console.log(err);
//      else console.log(campground);
// }); 
app.use(flash());
app.use(require("express-session")({
     secret: "Once again Rusty wins cutest dog!",
     resave: false,
     saveUnitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
     res.locals.currentUser=req.user;
     res.locals.error=req.flash("error");
     res.locals.success=req.flash("success");
     next();
});
// app.get("/campgrounds",function(req, res){
//      res.render("campgrounds",{campgrounds: camps});
// });
// instead of using pre-define array now we switch to database

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.listen(process.env.PORT, process.env.IP, function(){
     console.log("server started!!");
});