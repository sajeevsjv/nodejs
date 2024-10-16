const express = require('express');
const app = express();
const mongoconnect = require("./db/connect");
const bookroutes = require("./routes/bookroutes");
const dotenv = require('dotenv');
dotenv.config();


console.log("process.env :",process.env);
console.log("mongodb_uri :",process.env.MONGODB_URI);

mongoconnect ();

app.use(express.static("../client/admin"))
app.use(express.static("../client/user"))
app.use(express.json());
app.use(bookroutes);

app.listen(process.env.PORT, ()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);

});
