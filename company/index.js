/* Start Form Control Coding */

let mainBox = document.querySelector("#main-box");
let loginBox = document.querySelector(".login-box");
let signupBox = document.querySelector(".signup-box");
let signupBtn = document.querySelector(".signup-btn");
let loginBtn = document.querySelector(".login-btn");



/* Start Signup Btn Coding */

signupBtn.addEventListener("click", () => {

    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    signupBtn.classList.add("d-none");
    loginBtn.classList.remove("d-none");
})



/* Start Login Btn Coding */

loginBtn.addEventListener("click", () => {

    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    signupBtn.classList.remove("d-none");
    loginBtn.classList.add("d-none");
})



/* Start Signup form coding */

let signupForm = document.querySelector(".signup-form");
let signupInputEl = signupForm.querySelectorAll("input");
let signupTextarea = signupForm.querySelector("textarea");
let registerBtn = document.querySelector(".register-btn");



/* Start register btn coding */

signupForm.addEventListener("submit", (e) => {

    e.preventDefault();
    updateRegistration();
})



/* Start update Registration function coding */

const updateRegistration = () => {

    if (localStorage.getItem(signupInputEl[0].value + "_brand") == null) {

        if (signupInputEl[3].value.length == 10 && signupInputEl[3].value.charAt(0) >= 6) {

            const userData = {
                brandCode: signupInputEl[0].value,
                brandName: signupInputEl[1].value,
                website: signupInputEl[2].value,
                contact: signupInputEl[3].value,
                address: signupTextarea.value,
                username: signupInputEl[4].value,
                password: signupInputEl[5].value,
            }

            let userString = JSON.stringify(userData);
            localStorage.setItem(signupInputEl[0].value + "_brand", userString);

            signupForm.reset("");

            swal("Good job!", "Sign Up Successfully Done !", "success");
        }
        else {
            swal("Warning !", "Contact length must be 10 and starts with greater then equal to 6 !", "warning");
        }
    }
    else {
        swal("Change Brand Code !", "This Brand Code Is Already Taken !", "warning");
    }
}


/* Start SignIn Form Coding */

let signinForm = document.querySelector(".signin-form");
let signinBtn = document.querySelector(".signin-btn");
let brandCode = document.querySelector("#brand-code");
let username = document.querySelector("#username");
let password = document.querySelector("#password");



/* Start signin btn coding */

signinBtn.addEventListener("click", () => {

    if (brandCode.value && username.value && password.value != "") {

        if (localStorage.getItem(brandCode.value + "_brand") != null) {

            let allData = JSON.parse(localStorage.getItem(brandCode.value + "_brand"));

            if (allData.username == username.value) {

                if (allData.password == password.value) {

                    signinBtn.innerHTML = "Redirecting to dashboard...";
                    signinBtn.disabled = true;

                    setTimeout(() => {
                        window.location = ("/dashboard/index.html");

                        // set key and value and get data on dashboard page.
                        sessionStorage.setItem("brandCode", brandCode.value);
                        
                        signinForm.reset("");
                    }, 3000);
                }
                else {
                    swal("Wrong password !", "Please enter registered password !", "warning");
                }
            }
            else {
                swal("Wrong username !", "Please enter registered username !", "warning");
            }
        }
        else {
            swal("Not Registered !", "Please do registration first !", "warning");
        }
    }
    else {
        swal("Input field is empty !", "Please fill all the fields !", "warning");
    }
})