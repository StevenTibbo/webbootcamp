var express=require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    var query=req.query.searchData;
    var url="http://omdbapi.com/?s=" + query;
    console.log(url);
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            console.log(body);
             var results=JSON.parse(body);
            // res.send(results["Search"]["0"]["Title"]);
            res.render("data",{data: results});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started!!");
});