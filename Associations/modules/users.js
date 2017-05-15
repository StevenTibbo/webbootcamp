var mongoose=require("mongoose");
var userSchema=new mongoose.Schema({
     email: String,
     name: String,
     posts: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Post"
          }
     ]
});
module.exportr=mongoose.model("users",userSchema);
