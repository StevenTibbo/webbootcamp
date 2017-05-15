var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");


var postSchema=new mongoose.Schema({
     title: String,
     content: String
});

var Post=mongoose.model("posts",postSchema);


var userSchema=new mongoose.Schema({
     email: String,
     name: String,
     posts: [postSchema]
});

var User=mongoose.model("users",userSchema);

var newUser=new User({
     email: "steven@una.edu",
     name: "steven chang"
});

// newUser.posts.push({
//      title: "how to bre polyjuice potion",
//      content: "Just Kidding go to potions class to learn it "
// });

newUser.save(function(err,user){
     if(err) console.log(err);
     else console.log(user);
});

// var newPost= new Post({
//      title: "Reflections on Apples",
//      content: "They are delicious"
// });

// newPost.save();

User.findOne({name: "steven chang"}, function(err, user){
     if(err) console.log(err);
     else {
          user.posts.push({
               title: "3 thing I really hate",
               content: "Voldemort. Voldmort. Voldemort"
          });
          user.save(function(err, user){
               if(err) console.log(err);
               else console.log(user);         
          });
     }
});

