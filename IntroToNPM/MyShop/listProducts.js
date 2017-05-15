var fakes=require("faker");

for(var i=0; i<10; i++){
     var item=fakes.commerce.productName()+ " - $"+fakes.commerce.price()
     console.log(item);
}
