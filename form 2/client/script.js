async function adduser(event){
    event.preventDefault();
    console.log("reached here..."); 

    let name = document.getElementById("name").value;
    console.log("name:",name);

    let email = document.getElementById("email").value;
    console.log("email:",email);

    let pass = document.getElementById("pass").value;
    console.log("password:",pass);

   
    let emailerr = document.getElementById("email-err");
    let passerr = document.getElementById("pass-err");
    
    
    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let nameerr = document.getElementById("name-err");
    nameerr.innerHTML = '';


    if(!name){
        nameerr.innerHTML="name is required!";
        
    }
    else if(!namereg.test(name)){
        nameerr.innerHTML = "invalid name!"
        

    }

    if(!email){
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if(!emailreg.test(email)){
        emailerr.innerHTML = "invalid email!";
        return;
    }

    if(!pass){
        passerr.innerHTML = 'password required!'
        return;
    }

    

    let datas = {
        name,
        email,
        pass

    };

    console.log("datas:",datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:",json_data);

    let response = await fetch ("/submit",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: json_data
    });
    console.log("response:",response);

    let parsed_response = await response.text();
    console.log("parsed response:",parsed_response);

    if(parsed_response){
        alert(parsed_response);
        return;
    }
    else{
        alert("something went wrong");
    }

}


 let newfetch = fetch ("http://127.0.0.1:3000/submit",{
    method :"GET"
 })
    .then((response)=>{
        console.log("new response:",response);
        return response.json();
    
    })
    .then((datas)=>{
        console.log("datassss",datas);
        let tbody = document.getElementById('tbody');
        let content = '';
        for(i=0;i<datas.length;i++){
            content = content+`
            <tr>
            <td>${datas[i].name}</td>
            <td>${datas[i].email}</td>
            <td>${datas[i].password}</td>
            <td><button onclick="sendid('${datas[i]._id}')">view</button>
            <tr>`


        }
        tbody.innerHTML = content;
    })
    .catch((error)=>{
        console.log(error);
    })



function sendid(id){
    console.log("button clicked..")
    console.log("id:",id);
    window.location.href = `viewpage.html?id=${id}`
}

async function loaddata(){

        let location = window.location;
         console.log("location :",location);

         let querystring = location.search;
         console.log("querystring :",querystring);

         let queryparams = new URLSearchParams(querystring);
         console.log("queryparams :",queryparams);

         let id = queryparams.get("id");
         console.log("id :",id);

 let response = await fetch("http://127.0.0.1:3000/user",{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({"id":id})
 })
 console.log("response:",response);

 let parsed_response = await response.text();
 console.log("parsed response:",parsed_response);
 let json_response = JSON.parse(parsed_response);
 console.log("name:",json_response.name);

 let viewuser = document.getElementById("viewuser");
 let content = `
 <h4>Name : ${json_response.name}
 <h4>Email : ${json_response.email}
 <h4>Password : ${json_response.password}`

 viewuser.innerHTML= content;
       


}
    