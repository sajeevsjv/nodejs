const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongoconnect(){
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("database connection established..")
      
    }
    catch(err){
        console.log("database connection error :",err);
    }
}

module.exports = mongoconnect;