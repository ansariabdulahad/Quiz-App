/* Start profile picture coding */

let profileBox = document.querySelector(".profile-box");
let profileHeading = document.querySelector("#profile-heading");

profileBox.addEventListener("click", () => {

    const styles = window.getComputedStyle(profileBox);
    const image = styles.backgroundImage;
    const url = image.slice(5, -2);

    window.open(url);
})

/* End profile picture coding */


/* Start side navbar coding */

var togglerBtns = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");

togglerBtns[0].onclick = () => {

    sideNav.classList.add("active");

    togglerBtns[0].classList.add("d-none");
    togglerBtns[1].classList.remove("d-none");
}

togglerBtns[1].onclick = () => {

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

// result subject section var
var resultSubjectEl = document.querySelector("#result-subject");

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

        // result subject coding
        resultSubjectEl.innerHTML += `
        
        <option value="${subject.subjectName}"> ${subject.subjectName} </option>

        `
    })
}

chooseSubjectFunc(); // call chooseSubjectFunc on window load

let allQuestion = []; // array to store MCQs.
let subject;

let questionForm = document.querySelector(".question-form");
let allQuestionInput = questionForm.querySelectorAll("input");
// let firstOption = chooseSubject.querySelectorAll("option")[1];

// Start checkSubject function coding
const checkSubject = () => {

    // if (chooseSubject.value == "choose subject") {

    //     subject = firstOption.value;
    // }
    // else {

    subject = chooseSubject.value;
    // }

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
            optionFour: opFour,
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

var registrationDataEl = document.querySelector(".registration-data");  // t-body

// modal box variable
var modalHeading = document.querySelector(".modal-title");
var modalProfileBox = document.querySelector(".upload-box");
var uploadInput = document.querySelector(".upload-input");
var modalImageUrl; // global img url
var modalProfileHeading = document.querySelector(".modal-profile-heading");
var closeBtn = document.querySelector(".btn-close");


// registration form onsubmit coding

registrationForm.onsubmit = function (event) {

    event.preventDefault();

    let checkData = checkEnrollment(); // calling...

    if (checkData == "Found") {

        swal("Already Registered !", "Please change your enrollment number !", "warning");
    }
    else {

        registrationFunc();
        getRegistrationDataFunc();
    }

}


// get registered data from the session storage 

if (localStorage.getItem(brandCodeEl + "_registrationData") != null) {

    registrationData = JSON.parse(localStorage.getItem(brandCodeEl + "_registrationData"));
}


// prevent to duplicate enrollment

const checkEnrollment = () => {

    let i;

    var checkData = "";

    for (i = 0; i < registrationData.length; i++) {

        if (registrationData[i].enrollment == allRegInput[4].value) {

            checkData = "Found";
            break;
        }
        else {

            checkData = "Not Found";
        }

    }

    return checkData;
}



// registration function coding

const registrationFunc = () => {

    if (userType.value != "choose type") {

        registrationData.push({

            userType: userType.value,
            name: allRegInput[0].value,
            fatherName: allRegInput[1].value,
            dob: allRegInput[2].value,
            mobile: allRegInput[3].value,
            enrollment: allRegInput[4].value,
            password: allRegInput[5].value,
            address: address.value,
            profilePic: "/images/avtar.png"

        })

        localStorage.setItem(brandCodeEl + "_registrationData", JSON.stringify(registrationData));

        swal("Congratulations !", "Registration done successfully !", "success");

        registrationForm.reset("");
    }
    else {

        swal("Select Type !", "Please choose a user type !", "warning");
    }
}


// show data in table

const getRegistrationDataFunc = () => {

    registrationDataEl.innerHTML = "";

    registrationData.forEach((data, index) => {

        registrationDataEl.innerHTML += `
        
        <tr index = "${index}">
            <th scope="row">${index + 1}</th>
            <td>
                <div class="profile">
                    <img src="${data.profilePic}" class="rounded-circle" width="40" height="40" alt="img">
                </div>
            </td>
            <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.fatherName}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.dob}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.mobile}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.userType}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.password}</td>
            <td class="text-nowrap" style="width: 8rem;">${data.address}</td>
            <td class="text-nowrap" style="width: 8rem;">
                <i class="fa-solid fa-trash-can text-danger del-btn btn"></i>
                <i class="fa-solid fa-eye btn text-white edit-btn" type="button" data-bs-toggle="modal" data-bs-target="#myModal"></i>
            </td>
        </tr>
        `;
    });


    // start del btn conding

    var i, j;
    var allDelBtn = registrationDataEl.querySelectorAll(".del-btn");

    for (i = 0; i < allDelBtn.length; i++) {

        allDelBtn[i].onclick = function () {

            let parent = this.parentElement.parentElement;
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

                        registrationData.splice(index, 1);
                        localStorage.setItem(brandCodeEl + "_registrationData", JSON.stringify(registrationData));

                        getRegistrationDataFunc();

                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }


    // start edit btn coding

    var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");

    // modal box variables
    var modalForm = document.querySelector(".modal-form");
    var allModalInput = modalForm.querySelectorAll("input");
    var modalTextarea = modalForm.querySelector("textarea");
    var modalEditBtn = document.querySelector(".modal-edit-btn");
    var modalUpdateBtn = document.querySelector(".modal-update-btn");

    for (i = 0; i < allEditBtn.length; i++) {

        allEditBtn[i].onclick = function () {

            let parent = this.parentElement.parentElement;
            let index = parent.getAttribute("index");
            let td = parent.querySelectorAll("td");

            modalHeading.innerHTML = "Welcome : " + allUserData.brandName;

            let imgUrl = td[0].querySelector("img").src;
            let name = td[1].innerHTML;
            let fatherName = td[2].innerHTML;
            let dob = td[3].innerHTML;
            let mobile = td[4].innerHTML;
            let userType = td[5].innerHTML;
            let enrollment = td[6].innerHTML;
            let password = td[7].innerHTML;
            let address = td[8].innerHTML;

            // modal box coding

            modalProfileBox.style.backgroundImage = `url(${imgUrl})`;
            allModalInput[0].value = name;
            allModalInput[1].value = fatherName;
            allModalInput[2].value = dob;
            allModalInput[3].value = mobile;
            allModalInput[4].value = userType;
            allModalInput[5].value = enrollment;
            allModalInput[6].value = password;
            modalTextarea.value = address;

            modalProfileHeading.innerHTML = allModalInput[0].value;

            const d = new Date();
            let modalMonth = document.querySelector(".modal-month");
            let modalDate = document.querySelector(".modal-date");

            modalMonth.innerHTML = d.toLocaleString("default", { month: "long" });
            modalDate.innerHTML = d.getDate();

            // disabled all modal box input

            for (j = 0; j < allModalInput.length; j++) {

                allModalInput[j].disabled = true;
            }

            modalTextarea.disabled = true;
            uploadInput.disabled = true;


            // start modal edit btn coding

            modalEditBtn.onclick = function () {

                for (j = 0; j < allModalInput.length; j++) {

                    allModalInput[j].disabled = false;
                }

                modalTextarea.disabled = false;
                uploadInput.disabled = false;

                this.classList.add("d-none");
                modalUpdateBtn.classList.remove("d-none");

                // modal upadte btn coding

                modalUpdateBtn.onclick = function () {

                    let name = allModalInput[0].value;
                    let fatherName = allModalInput[1].value;
                    let dob = allModalInput[2].value;
                    let mobile = allModalInput[3].value;
                    let userType = allModalInput[4].value;
                    let enrollment = allModalInput[5].value;
                    let password = allModalInput[6].value;
                    let address = modalTextarea.value;

                    // update registration data array in local storage

                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {

                                registrationData[index] = {

                                    userType: userType,
                                    name: name,
                                    fatherName: fatherName,
                                    dob: dob,
                                    mobile: mobile,
                                    enrollment: enrollment,
                                    password: password,
                                    address: address,

                                    profilePic: modalImageUrl == undefined ? imgUrl : modalImageUrl

                                };

                                localStorage.setItem(brandCodeEl + "_registrationData", JSON.stringify(registrationData));

                                getRegistrationDataFunc();

                                this.classList.add("d-none");
                                modalEditBtn.classList.remove("d-none");
                                closeBtn.click();

                                swal("Poof! Your imaginary file has been deleted!", {
                                    icon: "success",
                                });
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                }

            }
        }
    }

}

getRegistrationDataFunc(); // onload calling


// Read modal profile pic coding

modalProfileBox.onchange = function () {

    let fReader = new FileReader();

    fReader.onload = function (e) {

        modalImageUrl = e.target.result;
        modalProfileBox.style.backgroundImage = `url(${modalImageUrl})`;
    }

    fReader.readAsDataURL(uploadInput.files[0]);
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

                            for (j = 0; j < span.length; j++) {

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

                            for (j = 0; j < span.length; j++) {

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


/* Start result section five coding */


// getting subject related result from database

var allResult = [];

var subjectResultBox = document.querySelector(".subject-result-data");
var emptySubjectMsg = document.querySelector(".empty-subject-msg");

resultSubjectEl.addEventListener("change", () => {

    subjectResultBox.innerHTML = ""; // empty before on change
    emptySubjectMsg.innerHTML = "";

    if (resultSubjectEl.value != "choose subject") {

        if (localStorage.getItem(brandCodeEl + "_" + resultSubjectEl.value + "_result") != null) {

            allResult = JSON.parse(localStorage.getItem(brandCodeEl + "_" + resultSubjectEl.value + "_result"));

            // read and store result in table
            allResult.forEach((data, index) => {

                subjectResultBox.innerHTML += `
                
                    <tr>
                        <td class="text-nowrap" style="width: 8rem;">${index + 1}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.wrongAns}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.maxMarks}</td>
                    </tr>

                `

            })
        }
        else {

            emptySubjectMsg.innerHTML = "There is no result related to this subject !";
        }
    }
    else {

        swal("Empty Field !", "Please select subject first !", "warning");
    }
})


// start get certificate coding

var closeBtn = document.querySelector(".certificate-close-btn");
var certificateMainBox = document.querySelector(".certificate-main");
var certificateForm = document.querySelector(".certificate-form");
var cerInput = certificateForm.querySelector("input");

var profilePicEl = certificateMainBox.querySelector(".profile-pic");

var cerBrandNameEl = certificateMainBox.querySelector(".brand-name");
var cerAddress = certificateMainBox.querySelector(".cer-address");
var cerNameEl = certificateMainBox.querySelector(".cer-name");
var cerEnrollmentEl = certificateMainBox.querySelector(".cer-enrollment");
var cerfatherEl = certificateMainBox.querySelector(".cer-father");

var cerData = certificateMainBox.querySelector(".cer-data");

var cerMaxMarksEl = certificateMainBox.querySelector(".max-marks");
var cerMarksObtainedEl = certificateMainBox.querySelector(".mark-obtained");
var cerTotalEl = certificateMainBox.querySelector(".total");

var finalResultBox = certificateMainBox.querySelector(".final-result-box");

// get certificate

certificateForm.onsubmit = function (e) {

    e.preventDefault();

    getCertificate(); // calling...
}

// getcertificate coding
const getCertificate = () => {

    if (cerInput.value != "") {

        cerData.innerHTML = "";

        if (localStorage.getItem(brandCodeEl + "_" + cerInput.value + "_result") != null) {

            let userResult = JSON.parse(localStorage.getItem(brandCodeEl + "_" + cerInput.value + "_result"));

            certificateMainBox.classList.add("active");

            cerBrandNameEl.innerHTML = allUserData.brandName;
            cerAddress.innerHTML = allUserData.address;
            cerNameEl.innerHTML = userResult[0].name;
            cerEnrollmentEl.innerHTML = userResult[0].enrollment;
            cerfatherEl.innerHTML = userResult[0].fatherName;

            // profilePicEl.src = userResult[0].profilePic;
            for (let i = 0; i < userResult.length; i++) {

                if (userResult[i].profilePic) {
                    profilePicEl.src = userResult[i].profilePic;
                }
            }

            let maxMarks = 0;
            let markObtained = 0;
            let total = 0;

            let finalResult = (total / maxMarks * 100).toFixed(2);

            if (finalResult <= 32.99) {

                finalResultBox.innerHTML = "FAIL";
            }
            else {

                finalResultBox.innerHTML = "PASS";
            }

            userResult.forEach((data, index) => {

                cerData.innerHTML += `
                
                    <tr>
                        <td class="text-nowrap" style="width: 8rem;">${index + 1}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.maxMarks}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
                        <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
                    </tr>
                    
                `

                maxMarks += data.maxMarks;
                markObtained += data.rightAns;
                total += data.rightAns;
            })

            cerMaxMarksEl.innerHTML = maxMarks;
            cerMarksObtainedEl.innerHTML = markObtained;
            cerTotalEl.innerHTML = total;

        }
        else {

            swal("No Result Found !", "There is no result present related to this enrollment !", "warning");
        }

    }
    else {

        swal("Input Field is Empty !", "Please Enter Your Enrollment Number !", "warning");
    }
}

// closing certificate coding

closeBtn.onclick = function () {

    certificateMainBox.classList.remove("active");
    cerInput.value = "";

}


/* End result section five coding */