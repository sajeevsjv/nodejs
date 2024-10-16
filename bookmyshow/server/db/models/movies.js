const mongoose = require('mongoose');
const genres = require("../models/genres");

let movies = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    certification : {
        type : String,
        required : true
    },
    genre : {
        type : String,
    },
    languages : {
        type : String,
        required : true
    },
    about : String,
    duration : {
        type : String,
        required : true
    },
    background_image : {
        type : String
    },
    thumbnail : {
        type : String
    },
    genres : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "genres"
    }],
})

module.exports = mongoose.model("movies",movies);