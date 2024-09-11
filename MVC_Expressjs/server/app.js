const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const  mongoConnect = require('./db/connect');

app.get("/test",(req,res)=>{
    res.status(200).send("test succesful");
});

//serving static files
app.use(express.static('../client'));

//database connection
mongoConnect();

//parse json datas
app.use(express.json());

//parse form datas
app.use(express.urlencoded({extended:true}));




app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})