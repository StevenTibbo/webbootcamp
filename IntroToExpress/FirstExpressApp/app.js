var express=require("express");
var app=express();

app.get('/', function(req,res){
   res.send('hi there!');  
});

app.get('/bye', function(req,res){
     res.send('bye!!');
});

app.get('/r/:subredditName', function(req,res){
     var subreddit = req.params.subredditName;
     res.send("WELCOME TO A "+subreddit.toUpperCase()+" SUBREDDIT!");
});

app.get('/r/:subredditName/comments/:id/:title',function(req,res){
     console.log(req.params);
});

app.listen(process.env.PORT,process.env.IP,function(){
     console.log("server has started!!");
});