var mongoose=require("mongoose");
// var comment=require("./models/comment");

var campgroundSchema=new mongoose.Schema({
     name: String,
     image: String,
     description: String,
     comments:[
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Comment"
          }
     ],
     author:{
          id:{
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
          },
          username: String
     },
     price: String
});

module.exports=mongoose.model("Campground",campgroundSchema);
