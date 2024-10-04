// global variables

var allQuestion = [];
var allUserResult = [];
var particularUserResult = [];

var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");

var studentName = sessionStorage.getItem("name");
var stuEnrollment = sessionStorage.getItem("enrollment");
var stuAddress = sessionStorage.getItem("address");
var fatherName = sessionStorage.getItem("fatherName");
var imgUrl = sessionStorage.getItem("imgUrl");

// Read subject questions from local storage coding

if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {

    allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
}

var index = 0;
var total = allQuestion.length;
var right = 0;
var wrong = 0;

var mainBox = document.querySelector(".main");
var questionEl = document.querySelector("#question-el");
var allInputs = document.querySelectorAll(".option");
var nextBtn = document.querySelector(".next-btn");




// start code of displaying subject question on page

// uncheck or reset inputs typed radio coding

const resetFunc = () => {

    allInputs.forEach((input) => {

        input.checked = false;
    })
}

// get all questions on page coding

const getQuestion = () => {

    if (index == total) {

        return endQuiz(); // calling...
    }

    resetFunc(); // calling to reset...

    var data = allQuestion[index];

    questionEl.innerText = `Q${index + 1} :- ${data.question}`;
    allInputs[0].nextElementSibling.innerText = data.optionOne;
    allInputs[1].nextElementSibling.innerText = data.optionTwo;
    allInputs[2].nextElementSibling.innerText = data.optionThree;
    allInputs[3].nextElementSibling.innerText = data.optionFour;

}

getQuestion(); // onload calling


// next btn coding

nextBtn.onclick = function () {

    let data = allQuestion[index];
    let ans = getAnswer(); // calling...

    if (ans == data.correctAnswer) {

        right++;
    }
    else {

        wrong++;
    }

    // show next question when clicked

    index++;
    getQuestion(); // calling...

    return;

}


// get checked answer coding

const getAnswer = () => {

    let answer;

    allInputs.forEach((input) => {

        if (input.checked) {

            answer = input.value;
        }
    })

    return answer;
}


// end Quiz function coding

const endQuiz = () => {

    mainBox.innerHTML = `

        <h1 class= "text-center text-success">Click on submit button to complete your examination !</h1>
        <div align="center">
        <button class= "btn btn-danger mt-3 fs-3 fw-bold shadow-lg quiz-submit-btn">SUBMIT</button>
        </div>
    `

    submitFunc(); // calling...
}


// submit quiz btn function coding

const submitFunc = () => {

    // condition to check allUserResult

    if (localStorage.getItem(brandCode + "_" + subject + "_result") != null) {

        allUserResult = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_result"));
    }

    // condition to check perticular user result

    if (localStorage.getItem(brandCode + "_" + stuEnrollment + "_result") != null) {

        particularUserResult = JSON.parse(localStorage.getItem(brandCode + "_" + stuEnrollment + "_result"));
    }
    // console.log(particularUserResult);

    let submitBtn = document.querySelector(".quiz-submit-btn");

    submitBtn.onclick = function () {

        document.cookie = brandCode + "_" + subject + "_" + stuEnrollment + "=done;max-age=86400;path=/";

        particularUserResultFunc(); // calling...

        allUserResultFunc(); // calling...

        setTimeout(() => {
            this.innerHTML = "Please Wait...";
            this.disabled = true;
        }, 1000);
    }
}


// allUserResult function coding 

const allUserResultFunc = () => {

    allUserResult.push({

        name: studentName,
        enrollment: stuEnrollment,
        rightAns: right,
        wrongAns: wrong,
        maxMarks: total,
        subject: subject,
        fatherName: fatherName

    });

    localStorage.setItem(brandCode + "_" + subject + "_result", JSON.stringify(allUserResult));

    setTimeout(() => {

        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("fatherName");
        sessionStorage.removeItem("subject");
        sessionStorage.removeItem("name");

        window.location = "/homepage/index.html";

        // swal("Congratulations !", "You have successfully completed your exam !", "success");

    }, 2500);
}


// particular user result function

const particularUserResultFunc = () => {

    particularUserResult.push({

        name: studentName,
        fatherName: fatherName,
        enrollment: stuEnrollment,
        rightAns: right,
        wrongAns: wrong,
        maxMarks: total,
        subject: subject,
        profilePic: imgUrl

    })

    localStorage.setItem(brandCode + "_" + stuEnrollment + "_result", JSON.stringify(particularUserResult));

    setTimeout(() => {

        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("fatherName");
        sessionStorage.removeItem("subject");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("imgUrl");

        window.location = "/homepage/index.html";

        // swal("Congratulations !", "You have successfully completed your exam !", "success");

    }, 2500);

}