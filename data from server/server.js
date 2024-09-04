const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 4000;

const server = http.createServer((req,res)=>{
    const req_url = req.url;
    console.log("req_url",req_url);

    // res.setHeader('Access-Control-Allow-Origin', '*');
    
    const parsed_url = url.parse(req_url);
    if(parsed_url.pathname === "/datas"){
        res.writeHead(200,{'content-type':'text/json'});
        res.end(fs.readFileSync('./user.json'));

    }

    else if (parsed_url.pathname === "/") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(fs.readFileSync('./index.html'));
    } 
    else if (parsed_url.pathname === "/style.css") {
        res.writeHead(200, { 'content-type': 'text/css' });
        res.end(fs.readFileSync('./style.css'));
    } 
    else if (parsed_url.pathname === "/script.js") {
        res.writeHead(200, { 'content-type': 'text/script' });
        res.end(fs.readFileSync('./script.js'));
    } 
    else if (parsed_url.pathname === "/viewpage.html") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(fs.readFileSync('./viewpage.html'));
    } 
});

server.listen(PORT, '127.0.0.1',()=>{
    console.log(`server running at http://127.0.0.1:${PORT} ...`)
})






