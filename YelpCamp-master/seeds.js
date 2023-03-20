var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name:"Austrailia",
        image:"http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name:"America",
        image:"https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name:"India",
        image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    }
]
function seedDB(){
    Campground.remove({},function(err){
    if(err)
    {
        console.log(err);
    }
//     else
//     console.log("removed campgrounds!");
//     // Add a few Campgrounds 
//     data.forEach(function(seed){
//     Campground.create(seed,function(err,campground){
//      if(err)
//          console.log(err);
//      else
//          console.log("Added a Campground");
//          //Create a Comment
//          Comment.create(
//              {
//                  text:"My life is awesome around here.",
//                  author: "Jasbir Singh"
//              },function(err,comment)
//              {
//                  if(err)
//                  {
//                      console.log(err);
//                  }
//                  else
//                  {
//                      campground.comments.push(comment);
//                      campground.save();
//                      console.log("Created New Comment");
//                  }
//              }
//          );
//   });
// });
    });
}

// Add some comments
module.exports = seedDB;
