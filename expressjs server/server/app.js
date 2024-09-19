const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('../client'));
app.use(express.json());

async function mongoconnect() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established..");
    }
    catch(error){
        console.log("database connection errror:",error);
    }
    
}
mongoconnect();

let usersschema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    age: Number
});

let user = mongoose.model("user",usersschema);

app.get('/test',(req,res,next)=>{
    console.log("First middleware");
    next();
},
(req,res,next)=>{
    console.log("second middleware");
    next();
},
(req,res)=>{
    console.log("Third middleware");
    res.status(200).send("success");

});

// response when submitting form data
app.post("/submit",async (req,res)=>{

    try{
        let body = req.body;
        console.log("body:",body);

        let name = body.name;
        let email = body.email;
        let password = body.password;
        
        let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
        let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passreg = /^.{6,}$/;
        
        if( !name && !email && !password){
            res.writeHead(400,{'Content-Type':'text/plain'});
            res.end('name, email and password is required!')
        }
            
        if (!name) {
            res.status(400).send('name is required!');
            return;
    
        }
        else if (!namereg.test(name)) {
            res.status(400).send('Invalid name!');
            return;
        }
    
        if (!email) {
            res.status(400).send('email is required!');
            return;
        }
        else if (!emailreg.test(email)) {
            res.status(400).send('Invalid email!')
            return;
        }
    
        if (!password) {
            res.status(400).send('name, email and password is required!');
            return;
        }
        else if(!passreg.test(password)){
            res.status(400).send('name, email and password is required!');
            return;
    }

    let count = await user.countDocuments({email});
    if(count>0){
        res.status(400).send("email already exists");
        return;
    }
    
    
     let newuser = await  user.create(body);

        
        if(newuser){
            res.status(200).send("user created succesfully..");
            return;
    
        }
        else{
            res.status(400).send("failed to create the user");
            return; 

        }
    }
    catch(error){
        console.log("error:",error);
        res.status(400).send(error.message ? error.message : "something went wrong");
    }
    
       
});

// return the submitted data when fetches using get
app.get("/submit",async (req,res)=>{
    let userdata = await user.find();
    console.log("userdata :",userdata);

    res.status(200).send(userdata);
    
});

// return the user according to id
app.post("/user",async (req,res)=>{
    let body = req.body;
    console.log("body:",body);

    let id = body.id;
    console.log("id:",id);
    let obj_id = new mongoose.Types.ObjectId(id);
    console.log("obj_id:",obj_id);
    console.log("type od obj_id",typeof(obj_id));
    let userdata = await user.findOne({_id:obj_id});
    console.log("userdata:",userdata);
    let json_data = JSON.stringify(userdata);

    res.status(200).send(json_data);

});

app.put("/user",async (req,res)=>{
    body = req.body;
    console.log("body:",req.body);
    let id = body.id;
    console.log("typeof id",typeof(id));
    let _id = new mongoose.Types.ObjectId(id);
    let name = body.name;
    let email = body.email;
    let password = body.password;

    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passreg = /^.{6,}$/;
    
    if( !name && !email && !password){
        res.status(400).send('name, email and password is required!');
        return;
    }
        
    if (!name) {
        res.status(400).send('name is required!');
        return;

    }
    else if (!namereg.test(name)) {
        res.status(400).send('Invalid name!');
        return;
    }

    if (!email) {
        res.status(400).send('email is required!');
        return;
    }
    else if (!emailreg.test(email)) {
        res.status(400).send('Invalid email!')
        return;
    }

    if (!password) {
        res.status(400).send('name, email and password is required!');
        return;
    }
    else if(!passreg.test(password)){
        res.status(400).send('name, email and password is required!');
        return;
}

let count = await user.countDocuments({email});
if(count>0){
    res.status(400).send("email already exists");
    return;
}



    let newdata = {name,email,password};

    await user.updateOne({_id},{$set : newdata});

    res.status(200).send("user updated successfully");
});

app.delete('/user',async (req,res)=>{
    let body = req.body;
    body = req.body;
    console.log("body:",req.body);
    let id = body.id;
    console.log("typeof id",typeof(id));
    let _id = new mongoose.Types.ObjectId(id);
    console.log("_id",_id);

    await user.deleteOne({_id});
    res.status(200).send("user deleted succesfully");
})


 

app.listen(process.env.PORT,()=>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})





