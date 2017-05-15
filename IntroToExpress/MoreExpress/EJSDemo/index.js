var express=require("express");
var app=express();

//tell express to server the contents in the public directory
app.use(express.static("public"));
app.set("view engine","ejs");
//route
app.get('/',function(req,res){
   //res.render("home.ejs");  
   res.render("home");  
});

app.get("/fallinlovewith/:thing",function(req,res){
     var thing=req.params.thing
     //res.render("love.ejs",{thingVar: thing});
     res.render("love",{thingVar: thing});
});

app.get("/posts",function(req,res){
   var posts=[
        {title: "post 1", author: "susy"},
        {title: "My cute bunny", author: "charlie"},
        {title: "Can you believe it?", author: "colt"}
        ];
     //res.render("posts.ejs", {posts: posts});
     res.render("posts", {posts: posts});
});
app.listen(process.env.PORT, process.env.IP,function(){
     console.log("Server Started!");  
});