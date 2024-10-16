const express = require('express');
const app = express();
const movieRoutes = require("./routes/movieRoutes");
const mongoconnect = require("./db/connect");
const dotenv = require('dotenv');
dotenv.config();

mongoconnect ();

app.use(express.static("../client"));

app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({extended : true}));
app.use(movieRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})