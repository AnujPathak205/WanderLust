const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

module.exports =  mongoose.model("Review",reviewSchema);
