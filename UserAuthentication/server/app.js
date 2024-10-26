const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoConnect = require("./db/connect");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

mongoConnect();

app.use(express.static("../client"));
app.use(express.json({limit : "100mb"}));
app.use(express.urlencoded({extended : true}));

app.use(authRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
});

