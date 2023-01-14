// global variable 

var allSubject = []; // array

var brandCode = sessionStorage.getItem("brandCode");
var allSubjectEl = document.querySelector("#all-subject-el");
var startQuizBtn = document.querySelector(".start-quiz-btn");


// read all subject from local storage coding

if(localStorage.getItem(brandCode + "_allSubject") != null) {

    allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
}


// store all subject in choose subject option coding

allSubject.forEach((subject, index) => {
    
    allSubjectEl.innerHTML += `
    
    <option value="${subject.subjectName}">${subject.subjectName}</option>

    `
})



// start quiz btn coding

startQuizBtn.addEventListener("click", () => {
    
    if(allSubjectEl.value != "choose subject") {

        let subject = allSubjectEl.value;
        
        startQuizBtn.innerHTML = "Please Wait...";
        startQuizBtn.disabled = true;

        setTimeout(() => {
            
            // sessionStorage.setItem("subject" ,brandCode + "_" + subject + "_question"); // direct set all // exceptional
            sessionStorage.setItem("subject", subject);
            window.location = "../quiz/quiz.html";
            allSubjectEl.innerHTML = "";

        }, 1500);
    }
    else {
        
        swal("Warning !", "Please Select Subject First !", "warning");
    }
})