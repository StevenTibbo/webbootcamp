var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema=new mongoose.Schema({
     name: String,
     age: Number,
     temperament: String
});

var Cat=mongoose.model("Cat", catSchema);
// var george=new Cat({
//      name: "Steven",
//      age: 11,
//      temperament: "Evil"
// });

// george.save(function(err, cat){
//      if(err){
//           console.log("SOMETHING WENT WRONG");
//           console.log(err);
//      }
//      else{
//           console.log("SUCCESS");
//           console.log(cat);
//      }
// });

Cat.create({
     name: "Snow White",
     age: 15,
     temperament: "bland"
}, function(err, cat){
    if(err){
        console.log(err);
   }
   else{
        console.log(cat);
   }    
});

Cat.find({},function(err, cats){
   if(err){
        console.log(err);
   }
   else{
        console.log(cats);
   }
});

