const mongoose = require ('mongoose');

let books = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true 
    }

})

module.exports = mongoose.model("books",books)