var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post=require("./modules/posts");
var User=require("./modules/users");

// User.create({
//      email: "ymhchang_yahoo.com",
//      name: "yu ming"
// });

// Post.create({
//      title: "How to cook the best burger",
//      content: "blah blah blah"
// });


// Post.create({
//      title: "new post 2",
//      content: "this is another new post"
// }, function(err, post){
//      if(err) console.log(err);
//      else{
//            User.findOne({email:"ymhchang@yahoo.com"}, function(err, foundUser){
//                if(err) console.log(err)
//                else{
//                     foundUser.posts.push(post);
//                     foundUser.save(function(err, data){
//                          if(err) console.log(err)
//                          else console.log(data);
//                     });
//                }
//           }); 
//      }          
// });

Post.find({title:"new post"},function(err,post){
     if(err) console.log(err);
     else console.log(post.length);
});



// var insertingPost;
// Post.findOne({title:"new post"},function(err,post){
//      if(err) console.log(err);
//      else insertingPost=post;
// });


// User.findOne({email:"ymhchang@yahoo.com"},function(err,user){
//      if(err) console.log(err);
//      else {
//           user.posts.push(insertingPost);
//           user.save();
//      }
// });


// User.findOne({email:"ymhchang_yahoo.com"},function(err,user){
//      if(err) console.log(err);
//      else {
//           User.update({email:"ymhchang@yahoo.com"},function(err,user){
//                if(err) console.log(err);
//                else console.log(user);
//           });
//      }
// })
// User.findOne({email:"ymhchang@yahoo.com"}).populate("posts").exec();
// User.findOne({email: "ymhchang@yahoo.com"},function(err,user){
//      if(err) console.log(err);
//      else user.populate("posts", function(err, doc){
//           if(err) console.log(err);
//           else doc.exec(function(err,user){
//                 if(err) console.log(err);
//                 else console.log(user);
//           });
//      });     
// });
