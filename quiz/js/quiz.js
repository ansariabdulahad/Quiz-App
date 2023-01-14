// global variable

var allQuestion = [];

var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");


// Read subject questions from local storage coding

if(localStorage.getItem(brandCode + "_" + subject + "_question") != null) {

    allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
}


// start code of displaying subject question on page

