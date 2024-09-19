async function addproduct(event) {
    event.preventDefault();
    let url = document.getElementById("url").value;
    console.log("url:", url);

    let title = document.getElementById("title").value;
    console.log("title:", title);

    let description = document.getElementById("description").value;
    console.log("description:", description);

    let price = document.getElementById("price").value;
    console.log("price:", price);

    let datas = {
        url,
        title,
        description,
        price
    }

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    let response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json_data
    })
    console.log("response:", response);

    if (response.ok) {
        window.location.href = "viewpage.html";
    }

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);

    if (parsed_response) {
        alert(parsed_response);


    }
    else {
        alert("something went wrong");
    }
    if(response.ok){
        window.location.href = "users-viewpage.html"
    }

}



let response = fetch("http://localhost:3000/products", {
    method: "GET"
})
    .then((response) => {
        console.log("new response:", response);
        return response.json();

    })
    .then((datas) => {
        console.log("datassss", datas);
        let container = document.getElementById('container');

        let content1 = '';

        for (let i = 0; i < datas.length; i++) {
            content1 = content1 + `
                <div onclick = sendid('${datas[i].id}') class="box">
                <div class="img-div">
                    <img src="${datas[i].url}" alt="img">
                </div>
                <span class="title">${datas[i].title}</span>
                <p class="price">$${datas[i].price}</p>
            </div>`

        }
        container.innerHTML = content1;


    })

    .catch((error) => {
        console.log(error);
    })



let response1 = fetch("http://localhost:3000/products", {
    method: "GET"
})
    .then((response) => {
        console.log("new response:", response);
        return response.json();

    })
    .then((datas) => {

        // viewAllProducts page
        let productstable = document.getElementById('productstable');
        console.log("productstable:", productstable);
        let content2 = '';

        for (let j = 0; j < datas.length; j++) {
            content2 = content2 + `
                
                <tr>
                <td class="col-title">${datas[j].title}</td>
                <td class="col-url">${datas[j].url}</td>
                <td class="col-description">${datas[j].description}</td>
                <td class="col-price">${datas[j].price}</td>
                <td> 
                  <div class="buttons-td">
                                <button onclick="sendid('${datas[j]._id}')">Edit</button>
                                <button onclick="deleteproduct('${datas[j]._id}')">Delete</button>
                            </div>
                </td>
                </tr>`
        }
        productstable.innerHTML = content2;

    })
    .catch((error) => {
        console.log(error);
    })







function sendid(id) {
    console.log("edit btn clicked ..")
    console.log("id:", id);
    window.location.href = `editpage.html?id=${id}`
}




//editpage

// loading data to form

async function loaddata() {
    console.log("loading data..")
    querystring = window.location.search;
    console.log("querystring :", querystring);

    parsed_querystring = new URLSearchParams(querystring);
    let id = parsed_querystring.get("id");
    console.log("id from loaddata function:", id);


    let response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "GET"
    })

    console.log("response for getsingleProduct :", response);
    let json_response = await response.json();
    console.log("json_response :", json_response);
    console.log("type of json_response", typeof (json_response))
    console.log("product title:", json_response.title);

    let formdata = document.getElementById("formdata");
    let data = `
     <div class="userformdiv"><span class="userform">EditProduct</span></div>
                <div class="form-row"><input type="url" name="url" value='${json_response.url}' id="url" placeholder="image url"> <span
                        class="clienterr" id="name-err"></span></div>
                <div class="form-row"><input type="text" name="title" id="title" value='${json_response.title}' placeholder="product title"> <span
                        class="clienterr" id="email-err"></span>
                </div>
                <div class="form-row"><textarea name="description" id="description"  rows="5" cols="50" placeholder="product description">${json_response.description}</textarea></span>
                </div>
                <div class="form-row"><input type="number" name="price" value='${json_response.price}' id="price"
                        placeholder="Product price"> <span class="clienterr" id="pass-err"></span>
                </div>
                <button class="submit" type="submit">Update</button></span>`


    formdata.innerHTML = data;


};


async function updatedata(event) {
    event.preventDefault();

    console.log("updatedata function executed..");

    querystring = window.location.search;
    console.log("querystring :", querystring);

    parsed_querystring = new URLSearchParams(querystring);
    let id = parsed_querystring.get("id");
    console.log("id from loaddata function:", id);



    let url = document.getElementById("url").value;
    let title = document.getElementById("title").value;

    let description = document.getElementById("description").value;
    console.log("description:", description);

    let price = document.getElementById("price").value

    console.log("title:", title);

    let newdata = {
        id,
        url,
        title,
        description,
        price
    }

    console.log("new data:", newdata);
    let json_data = JSON.stringify(newdata);

    response = await fetch("http://localhost:3000/products", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: json_data
    })

    console.log("response:", response);
    text_response = await response.text();
    console.log("text_response:", text_response);


    if (text_response) {
        alert(text_response);
    }
    else {
        alert("something went wrong")
    }
    if (response.ok) {
        window.location.href = "users-viewpage.html"
    }



}

async function deleteproduct(id) {
    console.log("delete button clicked..");
    console.log("id:", id);

    let response = await fetch("http://localhost:3000/products", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "id": id })
    });
    console.log("response:",response);

    let text_response = await response.text();
    if(text_response){
        alert(text_response);
    }
    else{
        alert("something went wrong")
    }
    if(response.ok){
        window.location.href = "users-viewpage.html";
    }

}











