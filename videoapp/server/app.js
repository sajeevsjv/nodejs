const express = require('express');
const  app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoconnect = require('./db/connect');
const videoRoutes = require("./routes/videoRoutes");

mongoconnect();

app.use(express.static("../client"));
app.use(express.json({limit : "100mb"}));
app.use(express.urlencoded({extended : true}));

app.use("/upload", express.static("./upload"));

app.use(videoRoutes);




app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`)
})

