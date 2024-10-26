let signup = document.getElementById("signup");
let otpsection = document.getElementById("otpsection");

// Timer function
let timerElement = document.getElementById('timer');
let otpInput = document.getElementById('otp-input');
let submitBtn = document.getElementById('submitBtn');
let timeLeft = 60;

let timerInterval = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "Time's up!";
    disableOTP();
  } else {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeLeft--;
  }
}, 1000);

// Disable OTP input and submit button when time runs out
function disableOTP() {
  otpInput.disabled = true;
  submitBtn.disabled = true;
}

// Enable submit button when OTP field is filled
otpInput.addEventListener('input', () => {
  if (otpInput.value.length === 6) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});


otpsection.style.display = 'none'

async function emailsend(event) {
    
    if(otpsection.style.display === 'none'){
        otpsection.style.display = 'block';
    }
    else{
        otpsection.style.display = 'none';
    }
    
    // event.preventDefault();
    console.log("reached here...");

    let name = document.getElementById("name").value;
    console.log("name:", name);

    let email = document.getElementById("email").value;
    console.log("email:", email);

    
    let nameerr = document.getElementById("name-err");
    let emailerr = document.getElementById("email-err");
    // let passerr = document.getElementById("pass-err");


    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // let passreg = /^.{6,}$/;

    nameerr.innerHTML = '';
    emailerr.innerHTML = '';
    // passerr.innerHTML = '';

    // validation at client side
    if (!name && !email) {
        nameerr.innerHTML = "name is required!";
        emailerr.innerHTML = "email is required!";
        // passerr.innerHTML = "password is required!"
    }

    if (!name) {
        nameerr.innerHTML = "name is required!";
        return;

    }
    else if (!namereg.test(name)) {
        nameerr.innerHTML = "invalid name!"
        return;


    }

    if (!email) {
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if (!emailreg.test(email)) {
        emailerr.innerHTML = "invalid email!";
        return;
    }

    
    let datas = {
        name,
        email,

    };

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    let response = await fetch("/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
    });

    if (response.ok) {
        window.location.href = "getallusers.html";
    }

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);

    if (parsed_response) {
        alert(parsed_response);

    }
    else {
        alert("something went wrong");
    }

}