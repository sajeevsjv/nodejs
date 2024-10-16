const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoconnect = require("./db/connect");
const productRoutes = require('./routes/productRoutes');



mongoconnect();


app.use(express.static('../client'));
app.use(express.json());


app.use(productRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})





