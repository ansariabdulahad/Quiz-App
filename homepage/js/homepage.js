// Start Reading BrandCode from localStorage Coding

var i;
var brandCode = [];

for(i = 0; i < localStorage.length; i++) {

    let allKeys = localStorage.key(i);
    
    if(allKeys.match("_brand")) {

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