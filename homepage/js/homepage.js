// start global variable coding

var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
var loginSelectEl = loginForm.querySelector("select");
var loginBtn = loginForm.querySelector("button");
var loginNotice = loginForm.querySelector("h5");
var lBrandCode;
var allUserData = [];



// Start Reading BrandCode from localStorage Coding

var i;
var brandCode = [];

for (i = 0; i < localStorage.length; i++) {

    let allKeys = localStorage.key(i);

    if (allKeys.match("_brand")) {

        brandCode.push(allKeys.replace("_brand", ""));
    }
}


// start loop for brandCode Array

var brandCodeEl = document.querySelector("#brand-code");

brandCode.forEach((data, index) => {

    brandCodeEl.innerHTML += `
    
    <option value="${data}">${data}</option>

    `;

})



// Start login coding

loginSelectEl.addEventListener("change", () => {

    if (loginSelectEl.value != "choose brand code") {

        sessionStorage.setItem("brandCode", loginSelectEl.value);

        allLoginInput[0].disabled = false;
        allLoginInput[1].disabled = false;
        loginBtn.disabled = false;

        lBrandCode = sessionStorage.getItem("brandCode");

        loginUser(); // calling...
    }
    else {

        allLoginInput[0].disabled = true;
        allLoginInput[1].disabled = true;
        loginBtn.disabled = true;
    }

})


const loginUser = () => {

    if (localStorage.getItem(lBrandCode + "_registrationData") != null) {

        allUserData = JSON.parse(localStorage.getItem(lBrandCode + "_registrationData"));
        loginNotice.innerHTML = "";
    }
    else {

        loginNotice.innerHTML = "No data registered related to this brand !";
    }
    

    // login form onsubmit coding

    loginForm.onsubmit = function (e) {

        e.preventDefault();

        for (i = 0; i < allUserData.length; i++) {

            if (allUserData[i].enrollment == allLoginInput[0].value) {

                if (allUserData[i].password == allLoginInput[1].value) {

                    if (allUserData[i].userType == "Teacher") {

                        sessionStorage.setItem("brandCode", lBrandCode);
                        
                        window.location = "../dashboard/dashboard.html";
                        loginSelectEl.innerHTML = ""; // empty after getting result
                        return;
                    }
                    else {

                        sessionStorage.setItem("enrollment", allUserData[i].enrollment);
                        sessionStorage.setItem("name", allUserData[i].name);
                        sessionStorage.setItem("address", allUserData[i].address);
                        sessionStorage.setItem("fatherName", allUserData[i].fatherName);
                        sessionStorage.setItem("imgUrl", allUserData[i].profilePic);
                        sessionStorage.setItem("brandCode", lBrandCode);

                        window.location = "../welcome/welcome.html";
                        loginSelectEl.innerHTML = ""; // empty after getting result
                        return;
                    }
                }
                else {

                    swal("Wrong Password !", "Contact With Your Brand !", "warning");
                    return;
                }
            }
            else {

                swal("Wrong Enrollment !", "Contact With Your Brand !", "warning");
            }
        }
    }

}