const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongoconnect(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
    }
    catch(error){
        console.log("mongodb connection error :",error);
    }
}
module.exports = mongoconnect