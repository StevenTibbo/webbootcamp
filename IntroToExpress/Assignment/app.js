var express=require("express");
var app=express();

app.get('/',function(req,res){
     res.send("Hi there, welcome to my assignment!");  
});

app.get('/speak/:animal',function(req,res){
     var animal=req.params.animal;
     // switch(animal){
     //      case 'pig':
     //           res.send("The pig says 'Oink'");
     //           break;
     //      case 'cow':
     //           res.send("The cow says 'Moo'");
     //           break;
     //      case 'dog':
     //           res.send("The dog says 'Woof'");
     //           break;
     //      default:     
     //           res.send("Cant recognize the animal");
     //           break;
     // }
     var sounds ={
          pig: "Oink",
          cow: "Moo",
          dog: "Woof",
          cat: "meow"
     }
     var sound=sounds[animal]
     res.send('The '+animal+' says '+sound);
});

app.get('/repeat/:word/:number',function(req,res){
     var word=req.params.word;
     var num=Number(req.params.number);
     var result="";
     console.log(num);
     for(var i=0; i<num; i++){
          result=result+word+" ";
     }
     res.send(result);
});

app.get('*',function(req,res){
     res.send("cant find the page");  
});

app.listen(process.env.PORT, process.env.IP,function(){
     console.log("Server started!");
})