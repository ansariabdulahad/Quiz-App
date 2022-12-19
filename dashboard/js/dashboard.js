/* Start profile picture coding */

let profileBox = document.querySelector(".profile-box");
profileBox.addEventListener("click", ()=> {
    window.open("../images/profile.jpg");
})

/* End profile picture coding */

/* Start main box coding */

let brandNameEl = document.querySelector("#brand-name");
let brandCodeEl = sessionStorage.getItem("brandCode");
let allUserData = JSON.parse(localStorage.getItem(brandCodeEl + "_brand"));

brandNameEl.innerHTML = "Welcome : " + allUserData.brandName;

/* End main box coding */