var bodyParser=require("body-parser"),
     express=require("express"),
     mongoose=require("mongoose"),
     methodOverride=require("method-override"),
     expressSanitizer=require("express-sanitizer"),
     app=express();
     
mongoose.connect("mongodb://localhost/restfulblog");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema=new mongoose.Schema({
     title: String,
     image: String,
     body: String,
     created: {type : Date, default : Date.now}
});

var Blog=mongoose.model("blogs",blogSchema);

// Blog.create({ 
//      title: "test",
//      image: "https://p1fmzg.by3301.livefilestore.com/y4mKXkmqdX8JJfnWIJSaL8QUC1vPzm4KH7ysth9im3_OoKG6Q9HojHwxCJruynziSP3eFgJCXJqia7PisPQdMNL8kpS27NYZPofUXwo_pU3D9RAX9ITfTRqzF3UOhcMtPeffk96AFvNYQc94lhj8cHvlmc9Ezn3omW9dRi4ryY5lD3btuyjnezTziJF3TpE9fJ7VwByWDGAAX-9o5rh6XnmoQ?width=3264&height=1836&cropmode=none",
//      body: "test"
// });

app.get("/",function(req, res){
     res.redirect("/blog");
});

app.get("/blog", function(req, res){
     Blog.find({}, function(err, blogs){
          if(err) console.log(err);
          else res.render("index",{blogs: blogs});
          //else res.send("here");
     });
});

app.post("/blog",function(req,res){
     req.body.blog.body=req.sanitize(req.body.blog.body);
     Blog.create(req.body.blog, function(err,newBlog){
          if(err) res.render("new");
          else res.redirect("/blog");
     });
});

app.get("/blog/new",function(req,res){
     res.render("new");  
});

app.get("/blog/:id", function(req,res){
     Blog.findById(req.params.id, function(err, foundBlog){
          if(err) res.redirect("/blog");
          else res.render("show" ,{blog: foundBlog}); 
     });
});
//edit
app.get("/blog/:id/edit", function(req,res){
     Blog.findById(req.params.id, function(err, foundBlog){
          if(err) res.redirect("/blog");
          else res.render("edit" ,{blog: foundBlog}); 
     });
});
//update
app.put("/blog/:id", function(req,res){
     req.body.blog.body=req.sanitize(req.body.blog.body);
     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
          if(err) res.redirect("/blog");
          else res.redirect("/blog/"+req.params.id);
     });
});

app.delete("/blog/:id", function(req,res){
     Blog.findByIdAndRemove(req.param.id, function(err){
          if(err) res.redirect("/blog");
          else res.redirect("blog");
     });  
});
app.listen(process.env.PORT,process.env.IP,function(){
     console.log("server started"); 
});