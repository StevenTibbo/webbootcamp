var mongoose=require("mongoose"),
Campground=require("./models/campground"),
Comment=require("./models/comment");

var data=[
     {
          name: "Cloud's Rest",
          image:"https://fkpcpg.by3301.livefilestore.com/y4m4QxK8VByuBLiMxh2PBRtC1gMbahLZhkdQHHvs8-Egh0ZyZMWSQKE63DZxNqR-HH73QYQU9k0cj18B1CceZpzBucJF9DoLchhCkzwMx20JrEXfjuqc3gBt1Bh1cX_GVg9F22eNQ9W9mpAPBZ4hz2xHEQGJeVjkTh0fJfrE9HP_XGGde7WZvwJAAftA1PdvajVQNub2Rt0cpzizZPjMtjnkg?width=2448&height=3264&cropmode=none",
          description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
     },

     {
          name: "Desert Mesa",
          image:"https://fkpfpg.by3301.livefilestore.com/y4mhHjFTJmu9SD_tkgqCRF2M2RciigR-YXRQ7X1X8QgjFtrCE7EonRj7A9n8_62dI5aufO7A2_r8T9cY00fi_C3_XddzHyoGRYRww6Lbc_o_K8bH6vOWaXoxL8YBlg_YJVOTVPFNFGtpYsEC2fMg9Itypr0t-KpjWn9ZwZznbii37lFBJNnUBptHpNS9luhwGFcYfTXbu9Lve8_O7GGFcf1MQ?width=2560&height=1920&cropmode=none",
          description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
     },

     {
          name: "Grand Canyon",
          image:"https://eqpypg.by3301.livefilestore.com/y4mDj1pCbEEGlAZy3SNu4snR9ra3bMlj0d-Etts1oCpNLeqwH3rDvtnCYkjGBqKUOLTXX-eMkrAm1OyAKUYQtfJM0UObAYtpJ00uWogNmZQ_KdrjW_uaDV5oUc_ywk8vf4207Aqux7zWbkmT8z5zN78diZ_FoBOfdQWBGwrFOt3nkl5yzPoy142-PbtT07-QkCplO_dHmtYdklB6qyl-gwVNg?width=1920&height=2560&cropmode=none",
          description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
     },     
];

function seedDB(){
     Campground.remove({},function(err){
          if(err) console.log(err);
          else{
               console.log("all post removed");
               data.forEach(function(seed){
                    Campground.create(seed,function(err,campground){
                         if(err) console.log(err);
                         else{ 
                              console.log(campground);
                              Comment.create({
                                   text: "This place is great, but I wish there was internet",
                                   author: "Homer"
                              },function(err, comment){
                                   if(err) console.log(err);
                                   else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("create new comment");
                                   }
                              });
                         }
                    })
               });              
          } 
     });
}

module.exports=seedDB;