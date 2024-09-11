const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongoConnect() {
    try{
        console.log("mongodb_uri:",process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected succesfully");
    }
    catch(error){
        console.log("database connection error:",error);
       
    }
    
}

module.exports = mongoConnect;