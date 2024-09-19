const products = require("../db/models/products");
const mongoose = require('mongoose');

exports.addproducts = async (req,res) =>{
    try{
        let body = req.body;
        console.log("body:",body);

        let url = body.url;
        let title = body.title;
        let description = body.description;
        let price = body.price;
    
    
     let newproduct = await  products.create(body);

        
        if(newproduct){
            res.status(200).send("Product added succesfully..");
            return;
    
        }
        else{
            res.status(400).send("failed to add the product");
            return; 

        }
    }
    catch(error){
        console.log("error:",error);
        res.status(400).send(error.message ? error.message : "something went wrong");
    }
}

exports.viewproducts = async (req,res) => {
    productdata = await products.find();
    console.log('productsdata :',productdata);
    res.status(200).send(productdata);
}

exports.deleteproducts = async (req,res) =>{
try{
    let id = req.body;
    console.log("id for delete:",id);

    let _id = new mongoose.Types.ObjectId(id);

    deleteproduct = await products.deleteOne({_id});
    if(deleteproduct){
        res.status(200).send("Product deleted succesfully");
        return;
    }
    else{
        res.status(400).send("failed to delete!");
        return;
    }

}


catch(error){
    console.log(error.message ? error.message : "something went wrong");
    res.status(400).send(error.message ? error.message : "something went wrong");
}
}

exports.viewsingleproduct = async (req,res) => {
    let id = req.params.id;
    console.log("id:",id);
    let _id = new mongoose.Types.ObjectId(id);

    let productdata = await products.findOne({_id});
    console.log("productdata:",productdata);

    res.status(200).send(productdata);
      
}

exports.updateproduct = async (req,res) =>{
    try{
        let data = req.body;
        console.log("data:",data);
    
        let id = data.id;
        let _id = new  mongoose.Types.ObjectId(id);
        console.log(_id);

        delete data.id;

        console.log("new data:",data);
    
        updateproduct = await products.updateOne({_id},{$set : data});
        if(this.updateproduct){
            res.status(200).send("product updated successfully")
        }
        else{
            res.status(400).send("update failed")
        }
        
    
    }
    catch(error){
        console.log(error.message ? error.message : "something went wrong");
        res.status(400).send(error.message ? error.message : "something went wrong")
    }
   
}
