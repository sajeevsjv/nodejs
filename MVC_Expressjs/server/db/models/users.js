const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    age:{
        type : Number,
        required : false,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model("users",users);