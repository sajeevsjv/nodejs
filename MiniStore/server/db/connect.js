let mongoose = require('mongoose')
let dotenv = require('dotenv');
dotenv.config();

async function mongoconnect(){
   try{
    mongoose.connect(process.env.MONGODB_URI);
   }
   catch(error){
    console.log("database connection error:",error);
   }
}

module.exports = mongoconnect;

