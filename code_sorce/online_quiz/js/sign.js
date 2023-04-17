
let Submit = document.getElementById('sub');
let users = [];
Submit.addEventListener('click', function (event) {
    event.preventDefault();
   
    let username = document.getElementById("username");
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let accept = document.getElementById('accept');
let reg_emil = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let reg_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// password conditions for reg_pass
// Contains at least one lowercase letter
// Contains at least one uppercase letter
// Contains at least one numeric digit
// Is at least 8 characters long
// Can only contain alphanumeric characters

    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();


    // Validation for username
    if (usernameValue === "") {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Username cannot be blank";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else if (usernameValue.length < 4) {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Username Too short";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "";
    }

    // Validation for email
    if (emailValue === "") {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Email cannot be blank";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else if (!emailValue.match(reg_emil)) {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Not a valid Email";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "";
    }

    // Validation for password
    if (passwordValue === "") {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Password cannot be blank";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else if (!passwordValue.match(reg_pass)) {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Not a valid Password";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "";
    }

    // Validation for password confirmation
    if (password2Value !== passwordValue) {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Password not match!!";
        small_err.style.color = "red";
        return false; // set button flag to false
    } else {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "";
    }

    // Validation for policy acceptance checkbox
    if (!accept.checked) {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "Plz Accept the Policy";
        return false; // set button flag to false
    } else {
        let small_err = document.querySelector(".small_err");
        small_err.textContent = "";
    }

    if (emailValue !== "" &&
        usernameValue.length > 4 &&
        emailValue !== "" &&
        emailValue.match(reg_emil) &&
        passwordValue !== "" &&
        passwordValue.match(reg_pass) &&
        password2Value === passwordValue &&
        accept.checked
    ) {
        saveUserData();

    }

});


// save User Data in local Storage
function saveUserData() {
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let counter = users.length + 1;

    let user = { id: counter, user_mail: email.value, user_pass: password.value, user_name: username.value };

    users.push(user);
    window.localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
}



