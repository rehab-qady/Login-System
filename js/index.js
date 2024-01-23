var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");

var data = [];
if (localStorage.getItem("userData") != null) {
  data = JSON.parse(localStorage.getItem("userData"));
}
function getData() {

  required();
 if(allInputsIsValid()  ){
  console.log('rere');
  var userData = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  var exist = isExist();

    if (exist == true) {
      document.getElementById("exist").innerHTML = `<span class="text-danger">Email already exists</span>`;
      console.log("ali");
      document.getElementById('signin').classList.replace('d-block','d-none');

    } else {
      console.log("rehab");
      data.push(userData);
      document.getElementById("exist").innerHTML = `<span class="text-success">Success</span>`;
      localStorage.setItem("userData", JSON.stringify(data));
      console.log(data);
      document.getElementById('signin').classList.replace('d-none','d-block');
    
  }
 }
 
  
  
}
function isExist() {
  for (var i = 0; i < data.length; i++) {
    if (data[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      console.log('already exist');
      return true;
    }
  }
  console.log('this email is new');
  return false;
}
function valName() {
  var userNameVal = /^[A-Z][a-zA-Z]{4,19}$/;
  var incorrectName = document.getElementById('errorName');
  if (userNameVal.test(signupName.value) == true) {
    console.log("valid Name");
    incorrectName.classList.replace("d-block", "d-none");
    signupName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    incorrectName.classList.replace("d-none", "d-block");
    signupName.classList.add("is-invalid");
    return false;
  }
}
function valEmail() {
  var userEmailVal = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var incorrectEmail = document.getElementById("errorEmail");
  if (userEmailVal.test(signupEmail.value) == true) {
    console.log('valid email');
    incorrectEmail.classList.replace("d-block", "d-none");
    signupEmail.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    incorrectEmail.classList.replace("d-none", "d-block");
    signupEmail.classList.add("is-invalid");
    return false;
  }
}
function valPass() {
  var userPassVal = /^[1-9]{3,10}$/;
  var incorrectPass = document.getElementById("errorPass");
  if (userPassVal.test(signupPassword.value)) {
    console.log('valid pass');
    incorrectPass.classList.replace("d-block", "d-none");
    signupPassword.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    incorrectPass.classList.replace("d-none", "d-block");
    signupPassword.classList.add("is-invalid");
    return false;
  }
}

function allInputsIsValid(){
  if(valName() && valEmail() && valPass() ){
    console.log('all inputs is valid');
    return true;
  }else{
    console.log('not all inputs is valid');
    return false;
  }
}
function goToSignIn(){
  window.location.href='login.html';
}
function required(){
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    document.getElementById("exist").innerHTML = `<span class="text-danger">All inputs is required</span>`;
    return false;
  } 

  return true;
}
var userInputName = JSON.parse(localStorage.getItem("userName"));
function logIn() {
  console.log("rere");
  var signinEmail = document.querySelector("#signinEmail");
  var signinPassword = document.querySelector("#signinPassword");
  console.log(data);
  var found = false;
  for (var i = 0; i < data.length; i++) {
    if (
      data[i].email.toLowerCase() == signinEmail.value.toLowerCase() &&
      data[i].password.toLowerCase() == signinPassword.value.toLowerCase()
    ) {
     
      userInputName = data[i].name;
      console.log(userInputName);
      localStorage.setItem("userName", JSON.stringify(userInputName));
      window.location.href = "welcom.html"; 
      found = true;
     
      return true;
    }
  }

  if (!found) {
    document.getElementById("incorrect").innerHTML = `<span class="text-danger text-center">Incorrect email or password</span>`;
  }
}

function displayWelcomUser() {
  var welcomeMsg = document.getElementById("welcome");
  welcomeMsg.innerText = `Welcome ${userInputName}`;
}

function logOut() {
  localStorage.removeItem("userName");
  location.href='login.html'
}


document.querySelector('form').addEventListener('submit',(e)=>e.preventDefault())