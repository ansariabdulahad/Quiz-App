/* Start profile picture coding */

let profileBox = document.querySelector(".profile-box");
let profileHeading = document.querySelector("#profile-heading");

profileBox.addEventListener("click", () => {
    window.open("../images/profile.jpg");
})

/* End profile picture coding */


/* Start side navbar coding */

var togglerBtns = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");

togglerBtns[0].onclick = ()=> {

    sideNav.classList.add("active");

    togglerBtns[0].classList.add("d-none");
    togglerBtns[1].classList.remove("d-none");
}

togglerBtns[1].onclick = ()=> {

    sideNav.classList.remove("active");

    togglerBtns[0].classList.remove("d-none");
    togglerBtns[1].classList.add("d-none");
}

/* End side navbar coding */


/* Start main box coding */

let brandCodeEl;

// URL Security Coding.
if (sessionStorage.getItem("brandCode") != null) {

    brandCodeEl = sessionStorage.getItem("brandCode");
}
else {

    document.body.innerHTML = "<h1>404 Error !" + "<br>" + "Page Not Found !</h1>";
    document.body.style.color = "red";
    document.body.classList = "error-msg";

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

let allSubject = [];

let subjectEl = document.querySelector(".subject");
let createSubBtn = document.querySelector(".create-subject-btn");

// createSubBtn coding
createSubBtn.onclick = function (e) {
    e.preventDefault();

    if (subjectEl.value != "") {

        newSubject(); // creating a subject
        subjectEl.value = "";
        swal("Congratulations !", "Subject is created successfully !", "success");
    }
    else {
        swal("Subject name is empty !", "Please fill the subject name !", "warning");
    }

    updateSubject(); // updating a subject in local storage

    chooseSubjectFunc(); // calling
    
}


// newSubject function coding
let visibleSubject = document.querySelector(".visible-subject");

const newSubject = (subject, index) => {

    let subjectName = subjectEl.value;

    // condition for get the subject name from local storage
    if (subject) {

        subjectName = subject.subjectName;
    }

    visibleSubject.innerHTML += `
    
    <div class="d-flex justify-content-between subject-box">
        <h5 index = "${index}">${subjectName}</h5>

        <div>
            <i class="mx-2 fa-solid fa-pen-to-square edit-btn"></i>
            <i class="mx-2 fa-solid fa-floppy-disk d-none save-btn"></i>
            <i class="mx-2 fa-solid fa-trash text-danger del-subject"></i>
        </div>
    </div>
    
    `;

    // Start delete icon coding

    let delBtn = document.querySelectorAll(".del-subject");

    let i;
    for (i = 0; i < delBtn.length; i++) {

        delBtn[i].onclick = function () {

            let parent = this.parentElement.parentElement;

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        parent.remove();

                        updateSubject();

                        chooseSubjectFunc();

                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

    // End delete icon coding


    /* Start Edit btn coding */

    let allEditBtn = document.querySelectorAll(".edit-btn");

    for (i = 0; i < allEditBtn.length; i++) {

        allEditBtn[i].addEventListener("click", (e) => {

            let parent = e.target.parentElement.parentElement;
            let h5 = parent.querySelector("h5");
            let saveBtn = parent.querySelector(".save-btn");

            e.target.classList.add("d-none");
            saveBtn.classList.remove("d-none");

            h5.contentEditable = true;
            // h5.focus();
            h5.style.border = "1px solid red";

            // saveBtn coding
            saveBtn.onclick = function () {

                let id = h5.getAttribute("index");
                let editedSub = h5.innerHTML;

                updateSubject(editedSub, id); // update the subject after clicking on save

                e.target.classList.remove("d-none");
                saveBtn.classList.add("d-none");
                h5.style.border = "none";
            }
        })
    }

    /* End Edit btn coding */
}

// getSubject function coding.
const getSubject = () => {

    if (localStorage.getItem(brandCodeEl + "_allSubject") != null) {

        allSubject = JSON.parse(localStorage.getItem(brandCodeEl + "_allSubject"));

        allSubject.forEach((subject, index) => {

            newSubject(subject, index);
        })
    }
}

getSubject(); // get subject from local storage

/* End section Two coding teacher box */



/* Start section two and three coding */

// updateSubject function coding.
const updateSubject = (editedSub, id) => {

    if (editedSub != undefined && id != undefined) {

        allSubject[id] = {

            subjectName: editedSub
        }

        swal("Updated !", "Your subject is updated successfully !", "success")
    }
    else {

        let i;
        allSubject = [];

        let subjectBox = visibleSubject.querySelectorAll(".subject-box");

        for (i = 0; i < subjectBox.length; i++) {

            let h5 = subjectBox[i].querySelectorAll("h5");

            allSubject.push({

                subjectName: h5[0].innerHTML
            });
        }
    }

    localStorage.setItem(brandCodeEl + "_allSubject", JSON.stringify(allSubject));
}


// Start MCQ btn and Option coding

// Start MCQ Section coding
let chooseSubject = document.querySelector("#choose-subject");

// Update & delete mcq var
let selectSubject = document.querySelector("#select-subject");

// chooseSubjectFunc coding
const chooseSubjectFunc = () => {

    chooseSubject.innerHTML = "<option value='choose subject'>Choose Subjects</option>";
    selectSubject.innerHTML = "<option value='choose subject'>Choose Subjects</option>";

    allSubject.forEach((subject, index) => {

        chooseSubject.innerHTML += `
        
        <option value="${subject.subjectName}"> ${subject.subjectName} </option>

        `;

        // Update & delete mcq section coding
        selectSubject.innerHTML += `
        
        <option value="${subject.subjectName}"> ${subject.subjectName} </option>

        `;
    })
}

chooseSubjectFunc(); // call chooseSubjectFunc on window load

let allQuestion = []; // array to store MCQs.
let subject;

let questionForm = document.querySelector(".question-form");
let allQuestionInput = questionForm.querySelectorAll("input");
let firstOption = chooseSubject.querySelectorAll("option")[1];

// Start checkSubject function coding
const checkSubject = () => {

    if (chooseSubject.value == "choose subject") {

        subject = firstOption.value;
    }
    else {

        subject = chooseSubject.value;
    }

}

checkSubject(); // calling 

// start onchange coding on chooseSubject
chooseSubject.addEventListener("change", () => {

    checkSubject();

    checkSubjectKey();
})

// createQuestionBtn coding
questionForm.onsubmit = (e) => {

    e.preventDefault();

    createQuestionFunc();

    // empty input fields of mcq
    if (chooseSubject.value == "choose subject") {

    }
    else {

        chooseSubject.value = "choose subject";

        allQuestionInput[0].value = "";
        allQuestionInput[1].value = "";
        allQuestionInput[2].value = "";
        allQuestionInput[3].value = "";
        allQuestionInput[4].value = "";
        allQuestionInput[5].value = "";
    }
}

// createQuestionFunc coding.
const createQuestionFunc = () => {

    if (chooseSubject.value != "choose subject") {

        updateQuestion();
    }
    else {
        swal("Choose Subject !", "Please choose subject name first !", "warning");
    }
}

const checkSubjectKey = () => {

    // get all MCQs from the local storage
    if (localStorage.getItem(brandCodeEl + "_" + subject + "_question") != null) {

        allQuestion = JSON.parse(localStorage.getItem(brandCodeEl + "_" + subject + "_question"));
    }
    else {

        allQuestion = [];
    }
}

checkSubjectKey(); // calling

// updateQuestion function coding
const updateQuestion = (index, question, opOne, opTwo, opThree, opFour, opFive) => {

    if (index != undefined && question != undefined) {

        allQuestion[index] = {

            question: question,
            optionOne: opOne,
            optionTwo: opTwo,
            optionThree: opThree,
            opFour: opFour,
            correctAnswer: opFive
        }

        localStorage.setItem(brandCodeEl + "_" + selectSubject.value + "_question", JSON.stringify(allQuestion));

    }
    else {

        allQuestion.push({

            question: allQuestionInput[0].value,
            optionOne: allQuestionInput[1].value,
            optionTwo: allQuestionInput[2].value,
            optionThree: allQuestionInput[3].value,
            optionFour: allQuestionInput[4].value,
            correctAnswer: allQuestionInput[5].value,
        })

        localStorage.setItem(brandCodeEl + "_" + chooseSubject.value + "_question", JSON.stringify(allQuestion));

        swal("Created !", "MCQ is created successfully !", "success");
    }
}

// Start returning mcqs from local storage coding
let newQuestions = [];

let visibleQuestion = document.querySelector(".visible-question");

selectSubject.addEventListener("change", () => {

    if (localStorage.getItem(brandCodeEl + "_" + selectSubject.value + "_question") != null) {

        newQuestions = JSON.parse(localStorage.getItem(brandCodeEl + "_" + selectSubject.value + "_question"));

        visibleQuestion.innerHTML = "";

        newQuestionFunc(); // calling

        if (newQuestions.length == 0) {

            visibleQuestion.innerHTML = '<h4><b style = "color : red;">No MCQ\'s are present related to this subject !</b></h4>'
        }
    }
    else {

        visibleQuestion.innerHTML = '<h4><b style = "color : red;">No MCQ\'s are present related to this subject !</b></h4>'
    }
})


// Start user registration coding

var registrationData = [];

var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("input");
var userType = registrationForm.querySelector("select");
var address = registrationForm.querySelector("textarea");


// registration form onsubmit coding

registrationForm.onsubmit = function(event) {
    
    event.preventDefault();

    registrationFunc();
}


// get registered data from the session storage 

if(localStorage.getItem(brandCodeEl + "_registrationData") != null) {

    registrationData = JSON.parse(localStorage.getItem(brandCodeEl + "_registrationData"));
}


// registration function coding

const registrationFunc = () => {
    
    if(userType.value != "choose type") {

        registrationData.push({

            userType : userType.value,
            name : allRegInput[0].value,
            fatherName : allRegInput[1].value,
            dob : allRegInput[2].value,
            mobile : allRegInput[3].value,
            enrollment : allRegInput[4].value,
            password : allRegInput[5].value,
            address : address.value
    
        })
    
        localStorage.setItem(brandCodeEl + "_registrationData", JSON.stringify(registrationData));

        swal("Congratulations !", "Registration done successfully !", "success");

        registrationForm.reset("");
    }
    else {

        swal("Select Type !", "Please choose a user type !", "warning");
    }
}


// start newQuestionFunc function coding
const newQuestionFunc = () => {

    newQuestions.forEach((question, index) => {

        visibleQuestion.innerHTML += `
        
        <div index = "${index}">
            <div class="question-list d-flex justify-content-between">
                <h4>${index + 1}) ${question.question}</h4>

                <div>
                    <i class="mx-3 fa fa-edit edit-btn"></i>
                    <i class="mx-3 fa fa-save d-none update-btn"></i>
                    <i class="mx-3 fa fa-trash text-danger del-btn"></i>
                </div>

            </div>

            <div class="d-flex flex-column mt-4 mb-4">
                <span class="mb-2">A) ${question.optionOne}</span>
                <span class="mb-2">B) ${question.optionTwo}</span>
                <span class="mb-2">C) ${question.optionThree}</span>
                <span class="mb-2">D) ${question.optionFour}</span>
                <span class="mb-2 bg-info p-2 text-black rounded-3"><i class="fa-solid fa-right-long"></i> ${question.correctAnswer}</span>
            </div>
        </div>
        
        `;
    });


    // Start delete mcq btn coding
    let allDelBtn = visibleQuestion.querySelectorAll(".del-btn");

    let i, j;
    for (i = 0; i < allDelBtn.length; i++) {

        allDelBtn[i].onclick = function () {

            let parent = this.parentElement.parentElement.parentElement;
            let index = parent.getAttribute("index");

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        newQuestions.splice(index, 1); // empty array
                        localStorage.setItem(brandCodeEl + "_" + selectSubject.value + "_question", JSON.stringify(newQuestions));
                        parent.remove();

                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });

        }
    }


    // Start allEditbtn mcq btn coding
    let allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");

    for (i = 0; i < allEditBtn.length; i++) {

        allEditBtn[i].onclick = function () {

            let parent = this.parentElement.parentElement.parentElement;
            let updateBtn = parent.querySelector(".update-btn");
            let h4 = parent.querySelector("h4");
            let index = +parent.getAttribute("index");

            this.classList.add("d-none");
            updateBtn.classList.remove("d-none");

            h4.contentEditable = true;
            h4.focus();

            let span = parent.querySelectorAll("span");

            for (j = 0; j < span.length; j++) {

                span[j].style.border = '1px solid #5344f5';
                span[j].contentEditable = true;
            }

            // start update mcq btn coding
            updateBtn.onclick = function () {

                let question = h4.innerHTML.replace(`${index + 1}) `, "");
                let opOne = span[0].innerHTML.replace("A) ", "");
                let opTwo = span[1].innerHTML.replace("B) ", "");
                let opThree = span[2].innerHTML.replace("C) ", "");
                let opFour = span[3].innerHTML.replace("D) ", "");
                let opFive = span[4].innerHTML.replace('<i class="fa-solid fa-right-long"></i> ', "");

                swal({
                    title: "Are you sure?",
                    text: "Once updated, you will not be able to recover this MCQ!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willUpdated) => {
                        if (willUpdated) {

                            //calling updatequestion
                            updateQuestion(index, question, opOne, opTwo, opThree, opFour, opFive);

                            // revert the editable functionality
                            h4.contentEditable = false;

                            for(j = 0; j < span.length; j++) {

                                span[j].style.border = "none";
                                span[j].contentEditable = false;
                            }

                            updateBtn.classList.add("d-none");
                            allEditBtn[index].classList.remove("d-none");

                            swal("Poof! Your MCQ has been updated!", {
                                icon: "success",
                            });

                        } else {

                            // revert the editable functionality
                            h4.contentEditable = false;

                            for(j = 0; j < span.length; j++) {

                                span[j].style.border = "none";
                                span[j].contentEditable = false;
                            }

                            updateBtn.classList.add("d-none");
                            allEditBtn[index].classList.remove("d-none");

                            swal("Your MCQ is safe!");
                        }
                    });
            }
        }
    }
}

/* End section two and three coding */