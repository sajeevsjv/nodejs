async function addUser(event) {
    event.preventDefault();

    console.log("Reached here...");

    let name = document.getElementById('name').value;
    console.log("name : ",  name);

    let email = document.getElementById('email').value;
    console.log("email : ",  email);

    let password=  document.getElementById('password').value;
    console.log("password : ", password);

    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let passwordError = document.getElementById('password-error');

    let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;


    //validations
    if(!name) {
        nameError.innerHTML = "Name is required";
    }else {
        nameError.innerHTML = "";
    }

    if(!email) {

        emailError.innerHTML = "Emai is required";

    }else if(!emailRegex.test(email)) {

        emailError.innerHTML = "Invalid email";

    }else {
        emailError.innerHTML = "";
    }
    

    if(!password) {
        passwordError.innerHTML = "Password is required";
    }else {
        passwordError.innerHTML = "";
    }


    let datas = {
        name,
        email,
        password,
    }
    console.log("datas : ", datas);


    let json_data = JSON.stringify(datas);
    console.log("json_data : ", json_data);


   let response = await fetch('/users', {
        method : "POST",
        headers : {
            'Content-Type' : "application/json",
        },
        body : json_data,
    });

    console.log("responser : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response);

    if(parsed_response) {
        alert(parsed_response);
        return;
    }else {
        alert("Something went wrong");
    }

}