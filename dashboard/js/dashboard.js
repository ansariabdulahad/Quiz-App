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

/* End section two and three coding */