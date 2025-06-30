const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : {
        type : String,
    },
    rating : {
        type : Number,
        enum: [1, 2, 3, 4, 5]
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model("Review", reviewSchema);