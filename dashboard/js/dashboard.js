/* Start profile picture coding */

let profileBox = document.querySelector(".profile-box");
let profileHeading = document.querySelector("#profile-heading");

profileBox.addEventListener("click", () => {
    window.open("../images/profile.jpg");
})

/* End profile picture coding */

/* Start main box coding */

let brandCodeEl;

// URL Security Coding.
if (sessionStorage.getItem("brandCode") != null) {

    brandCodeEl = sessionStorage.getItem("brandCode");
}
else {

    document.body.innerHTML = "<h1>404 Error !" + "<br>" + "Page Not Found !</h1>";
    document.body.style.color = "red";

    setTimeout(() => {
        swal("Unauthorised Person !", "Login Again....!", "error");
    }, 1000);

    setTimeout(() => {
        window.location = "../company/company.html";
    }, 4000);

}

let brandNameEl = document.querySelector("#brand-name");
let allUserData = JSON.parse(localStorage.getItem(brandCodeEl + "_brand"));

brandNameEl.innerHTML = "Welcome : " + allUserData.brandName;

// side nav profile heading code
profileHeading.innerHTML = allUserData.brandName;

/* End main box coding */

/* Start Logout Coding */

let logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", (e) => {

    e.target.innerHTML = "Logging Out...";
    e.target.disabled = true;
    sessionStorage.removeItem("brandCode");

    setTimeout(() => {
        window.location = "../company/company.html";
    }, 3000);
})

/* End Logout Coding */




/* Start section Two coding teacher box */

let subjectEl = document.querySelector(".subject");
let createSubBtn = document.querySelector(".create-subject-btn");

// createSubBtn coding
createSubBtn.onclick = function (e) {
    e.preventDefault();

    newSubject();
}

// newSubject function coding
let visibleSubject = document.querySelector(".visible-subject");

const newSubject = () => {

    visibleSubject.innerHTML += `
    
    <div class="d-flex justify-content-between">
        <h5>${subjectEl.value}</h5>

        <div>
            <i class="mx-2 fa-solid fa-pen-to-square"></i>
            <i class="mx-2 fa-solid fa-floppy-disk d-none"></i>
            <i class="mx-2 fa-solid fa-trash text-danger"></i>
        </div>
    </div>
    
    `;
}

/* End section Two coding teacher box */