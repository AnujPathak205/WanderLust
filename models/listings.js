const mongoose = require("mongoose");
const Review = require("./reviews.js");
const { required } = require("joi");

const listingSchema = new mongoose.Schema({
     title: {
        type:String,
        required:true
     },

     description: {
        type:String
     },

     image: [{
         filename:String,
         url:String
     }],

     price: {
        type:Number,
        min:0

     },

     location:{
        type:String
     },

     country: {
        type:String,
        required:true
     },

     review:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Review"
      }
     ],

     owner:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
     },

     geometry:{
         type:{
            type:String,
            enum:["Point"],
            required:true
         },

         coordinates: {
            type:[Number],//longitude,latitude
            required:true
         }
     },

     category:{
         type:String,
         enum: ["Room",
                "Flat",
                "Mountain",
                "Castle",
                "Historical",
                "Camping",
                "Amazing pool",
                "Beach",
                "Lake",
                "Desert",
                "Arctic",
                "Amazing view",
                "Farm"],
         required:true
     }
});

listingSchema.post("findOneAndDelete",async(listing) => {
   if(listing){
      await Review.deleteMany({_id:{$in:listing.review}});
   }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;