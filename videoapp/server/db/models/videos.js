const mongoose = require('mongoose');
const { type } = require('os');

const videos = new mongoose.Schema({
    video : {
        required : true,
        type : String
    },
    title : {
        required : true,
        type : String
    },
    duration : {
        type : String
    },
    quality : {
        type : String
    }
});

module.exports = mongoose.model("videos",videos);