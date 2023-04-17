
let html_butn = document.getElementById("html_butn");
let css_butn = document.getElementById("css_butn");
let js_butn = document.getElementById("js_butn");

let log_out_text_btn = document.getElementById("log_text_btn");
let if_dont_log = document.getElementById("if_dont_log");

let hey_user = document.getElementById("hey_user");

////////////////////////////////////////////////////////////

// if user log in show his/her name
let currentSession = window.sessionStorage.getItem("users_log");
let currentSessionObj = JSON.parse(currentSession);
  
   if (currentSessionObj !== null) {
      hey_user.textContent= "Hey " + currentSessionObj[0].name + " ^-^";
      hey_user.style.fontWeight="bold";
   }



log_out_text_btn.addEventListener("click" , function(){
   window.sessionStorage.clear();
   if_dont_log.textContent= "you should log in to start Quiz";
   if_dont_log.style.textShadow=" 1px 1px #555555"
   hey_user.textContent = "";
});




///////////////////////////////////////////////////////////////////////////////////

// to have secuire expreince user cant NOT start exam without DO Log in

html_butn.addEventListener("click", function (e) {
   e.preventDefault();

   let currentSession = window.sessionStorage.getItem("users_log");
   let currentSessionObj = JSON.parse(currentSession);



   if (currentSessionObj === null) {
      window.open("sign-up.html");

   } 
   else {
      window.open("qiuz.html");

   }
});


css_butn.addEventListener("click", function (e) {
   e.preventDefault();

   let currentSession = window.sessionStorage.getItem("users_log");
   let currentSessionObj = JSON.parse(currentSession);

   if (currentSessionObj === null) {
      window.open("sign-up.html");
   } else {
      window.open("qiuz-css.html");

   }
});


js_butn.addEventListener("click", function (e) {
   e.preventDefault();

   let currentSession = window.sessionStorage.getItem("users_log");
   let currentSessionObj = JSON.parse(currentSession);

   if (currentSessionObj === null) {
      window.open("sign-up.html");
   } else if (currentSessionObj !== null) {
      window.open("qiuz-js.html");
   }
});





