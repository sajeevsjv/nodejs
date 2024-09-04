const http = require('http');
const PORT = 3000;
const url = require('url');
const fs = require('fs'); 
const querystring = require('querystring');
const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function connect(){
    try{
        await client.connect();
        console.log("database connection established...");
    }
    catch(error){
        console.log("error:",error);                  
    }
}
connect();


const server = http.createServer((req, res) => {
    let db = client.db("college");
    let collection = db.collection ("student");
    const req_url = req.url;
    console.log("req_url", req_url);

    const parsed_url = url.parse(req_url);
    
    if (parsed_url.pathname === '/hello') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("hello world\n");  
    }
    else if (parsed_url.pathname === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(fs.readFileSync("../client/index.html"));
    }
    else if (parsed_url.pathname === '/style.css') {
        res.writeHead(200, {'content-type': 'text/css'});
        res.end(fs.readFileSync("../client/style.css"));
    }
    else if(parsed_url.pathname === "/submit" && req.method === 'POST'){
        console.log("reached here ..");

        let body ='';
        req.on('data',(chunks)=>{
            console.log("chunks:",chunks);
            body += chunks.toString();
        });

        req.on('end',()=>{
            let datas = querystring.parse(body);
            console.log("datas :",datas);

            console.log("name :",datas.name);
            console.log("email :",datas.email);
            console.log("Password :",datas.password);

            //save to a database
       collection.insertOne({
        name : datas.name,
        email : datas.email,
        password :datas.password
       })

       .then((message) =>{
        console.log("message",message);
        res.writeHead(201,{'content-Type':'text/plain'});
        res.end("user created succesfully..");
       })

       .catch((error)=>{
        console.log("error:",error);
        res.writeHead(400,{'content-Type':'text/plain'});
        res.end(error.message ? error.message : "user creation failed")
        });

       })

        
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`listening on http://127.0.0.1:${PORT}`);
});
