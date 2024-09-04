let fetchdata = fetch("http://127.0.0.1:3000/datas",{
    method:"GET"
})
.then((response)=>{
    console.log("response:",response);
})
.catch((error)=>{
    console.log("error msg:",error);
})