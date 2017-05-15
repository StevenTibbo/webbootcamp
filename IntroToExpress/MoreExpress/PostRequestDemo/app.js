var express=require("express");
var app=express();

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var friends=["Tony","Mrianda","justin","Pierre","lily"];

app.set("view engine","ejs");
app.get("/",function(req,res){
     res.render("home");  
});

app.get("/friends",function(req,res){
     res.render("friends",{friends:friends});
});

app.post("/addfriend",function(req,res){
     var newFriend=req.body.newfriend;
     friends.push(newFriend);
     res.redirect("/friends");
     console.log(req.body);
  //   res.render("friends",req.)     
});

app.listen(process.env.PORT, process.env.IP, function(){
     console.log("server started!");
});