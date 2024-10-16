const mongoose = require ('mongoose');

let genres = mongoose.Schema({
    genre : String

})
module.exports = mongoose.model("genres",genres);