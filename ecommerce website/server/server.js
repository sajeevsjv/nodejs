const http = require('http');
const url = require('url');
const PORT = 3000;
const fs = require('fs');
const querystring = require('querystring');
const {MongoClient} = require('mongodb');
let client = new MongoClient('mongodb://localhost:27017');

async function connect () {
    try{
        await client.connect();
        console.log("database connection established..")
    }
    catch(error){
        console.log(error);
    }
    
}
connect();

const server = http.createServer( async(req,res)=>{
    let db = client.db("products-dbs");
    let collection = db.collection('products');

    const req_url = req.url;
    console.log("req_url",req_url);

    const parsed_url = url.parse(req_url);

    if(parsed_url.pathname === '/'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(fs.readFileSync("../client/index.html"))
    }
    else if(parsed_url.pathname === '/style.css'){
        res.writeHead(200,{'Content-Type':'text/css'})
        res.end(fs.readFileSync("../client/style.css"))
    }
    else if(parsed_url.pathname === '/script.js'){
        res.writeHead(200,{'Content-Type':'text/script'})
        res.end(fs.readFileSync("../client/script.js"))
    }
    else if(parsed_url.pathname === '/datas' && req.method === 'POST'){
        // res.writeHead(200,{'Content-Type':'text/json'})
        // res.end(fs.readFileSync("../client/data.json"))

        let response_data = fs.readFileSync("../client/data.json",'utf8');
        json_data = JSON.parse(response_data);
    

        // inserting data into database
        console.log("inserting data in to database");
        await collection.insertMany(json_data)
       .then((message)=>{
        console.log(message);
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end("datas saved succesfully ..")
       })
       .catch((error)=>{
        console.log("error_msg",error);
        res.writeHead(400,{'content-Type':'text/plain'});
        res.end(error.message ? error.message : "failed to upload data")
       })
    }
    else if(parsed_url.pathname === "/submit" && req.method === 'GET'){
        let Datas = await collection.find().toArray();
        console.log("datas :",Datas);
        let json_data = JSON.stringify(Datas);
    
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(json_data);

    }



})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`listening on http://127.0.0.1:${PORT}`);
});
