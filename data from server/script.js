fetch("http://127.0.0.1:4000/datas")
    .then(response => {
        return response.json(); // Convert response to JSON
    })
    .then(data => {
        console.log("Data received:", data);
        let container = document.getElementById("container");
        let content ='';
        for(let i=0;i<30;i++){
            content = content + `
             <div class="box" onclick="sendlocation(${data[i].id})">
            <div class="img-div">
                <img src="${data[i].url}" alt="img">
            </div>
            <span class="title">${data[i].title}</span>
            <p class="album id">${"id : "+data[i].id}</p>
        </div>`

        }
        container.innerHTML = content;
          
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
    });

    function sendlocation (id){
        console.log("id :",id);
        window.location.href = `viewpage.html?id=${id}`

    }


    //viewpage script
    function loaddata (){
         let location = window.location;
         console.log("location :",location);

         let querystring = location.search;
         console.log("querystring :",querystring);

         let queryparams = new URLSearchParams(querystring);
         console.log("queryparams :",queryparams);

         let id = queryparams.get("id");
         console.log("id :",id);




        fetch("http://127.0.0.1:4000/datas")
        .then(response =>{
            return response.json();
        })
        
        .then( data =>{
            console.log("data :",data);
            let sec = document.getElementById("sec");
            let content = ` <div class="section">
            <div><img src="${data[id-1].url}" alt=""></div>
            <div>
                <h4 class="title">${data[id-1].title}</h4>
                <h5 class="albumid">${"ID : "+data[id-1].id}</h5>
            </div>
        </div>`

        sec.innerHTML = content;
        })
        .catch(error =>{
            console.log("message :",error);
        })


    }
    

