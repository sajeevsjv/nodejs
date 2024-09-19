const mongoose = require ('mongoose');

let products = new mongoose.Schema({
    url: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("products",products);