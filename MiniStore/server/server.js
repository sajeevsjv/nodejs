const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const mongoconnect = require("./db/connect");
const products = require('./db/models/products');
const productRoutes = require('./routes/productRoutes');



mongoconnect();


app.use(cors());
app.use(express.static('../client'));
app.use(express.json());



// app.delete("/products", async (req,res) =>{
//     try{
//         let id = req.body;
//         console.log("id for delete:",id);

//         let _id = new mongoose.Types.ObjectId(id);

//         deleteproduct = await product.deleteOne({_id});
//         if(deleteproduct){
//             res.status(200).send("Product deleted succesfully");
//             return;
//         }
//         else{
//             res.status(400).send("failed to delete!");
//             return;
//         }

//     }
//     catch(error){
//         console.log(error.message ? error.message : "something went wrong");
//         res.status(400).send(error.message ? error.message : "something went wrong");
//     }
// })

app.use(productRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})





