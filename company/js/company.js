/* Start Form Control Coding */

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

        if (signupInputEl[3].value.length == 10) {
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

            swal("Contact Length Must Be 10");
        }
    }
    else {

        swal("This Brand Code Is Already Taken !");
    }
}