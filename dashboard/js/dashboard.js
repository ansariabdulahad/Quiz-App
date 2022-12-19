/* Start profile picture coding */

let profileBox = document.querySelector(".profile-box");
let profileHeading = document.querySelector("#profile-heading");

profileBox.addEventListener("click", ()=> {
    window.open("../images/profile.jpg");
})

/* End profile picture coding */

/* Start main box coding */

let brandCodeEl;

// URL Security Coding.
if(sessionStorage.getItem("brandCode") != null) {

    brandCodeEl = sessionStorage.getItem("brandCode");
}
else {
    swal("Unauthorised Person !", "Login Again....!", "error");

    setTimeout(() => {
        window.location = "../company/company.html";
    }, 2000);
}

let brandNameEl = document.querySelector("#brand-name");
let allUserData = JSON.parse(localStorage.getItem(brandCodeEl + "_brand"));

brandNameEl.innerHTML = "Welcome : " + allUserData.brandName;

// side nav profile heading code
profileHeading.innerHTML = allUserData.brandName;

/* End main box coding */

/* Start Logout Coding */

let logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", (e)=> {
    
    e.target.innerHTML = "Logging Out...";
    e.target.disabled = true;
    sessionStorage.removeItem("brandCode");

    setTimeout(() => {
        window.location = "../company/company.html";
    }, 3000);
})

/* End Logout Coding */