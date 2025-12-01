let trainerLogin = document.getElementById('trainerlogin');
let memberLogin = document.getElementById('memberlogin');
let adminLogin = document.getElementById('adminlogin');
let memberReg = document.getElementById('memberregister');
let currentUser;

function init() {

    console.log("Login Page Opened");

    // login buttons
    trainerLogin.addEventListener("click", loginTrainer);
    memberLogin.addEventListener("click", loginMember);
    adminLogin.addEventListener("click", loginAdmin);
    memberReg.addEventListener("click", registerMember);

}

// function to get the current member that is logged in
function loginMember() {

    console.log("Logging in Member!");

    let input = document.getElementById('member-email');
    let email = input.value;

    console.log("Member Email: ", email);

    // request to check if the email is in the database
    fetch('/member-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(data => {

        // if the email was found, log in the user and transfer them to their personal page
        if (data.success) {
            currentUser = data.member;
            console.log ("Logged in Member: ", currentUser);
            alert("Welcome " + currentUser.first_name);

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = '/member-menu.html';
        }
        else {
            console.log("Could not find Member in database", data.message);
            alert("Member account does not exist: " + data.message);
        }

    })
    .catch(err => {
        console.error("Error loggin in member: ", err)
    });

}

// function to register a member
function registerMember() {

    const memberData = {

        first_name: document.getElementById("reg-firstname").value,
        last_name: document.getElementById("reg-lastname").value,
        email: document.getElementById("reg-email").value,
        date_of_birth: document.getElementById("reg-dob").value,
        gender: document.getElementById("reg-gender").value,
        phone_number: document.getElementById("reg-phone").value,
        weight: document.getElementById("reg-weight").value,
        height: document.getElementById("reg-height").value,
        heart_rate: document.getElementById("reg-heart").value,
        weight_goal: document.getElementById("reg-goal").value,

    };

    fetch('/member-registration', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(memberData)
    })
    .then(res => res.json())
    .then(data => {

        if(data.success) {

            alert("You have been Registered!");

            localStorage.setItem("currentUser", JSON.stringify(data.member));
            window.location.href = "/member-menu.html";


        }
        else {
            alert("Registration failed");
        }
    })
    .catch (err => {
        console.log("Could not register new user ", err);
    });

}

// function to get the current trainer that is logged in
function loginTrainer() {

    console.log("Logging in Trainer!");

    let input = document.getElementById('trainer-email');
    let email = input.value;

    console.log("Trainer Email: ", email);

    // request to check if the email is in the database
    fetch('/trainer-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(data => {

        // if the email was found, log in the user and transfer them to their personal page
        if (data.success) {
            currentUser = data.trainer;
            console.log ("Logged in Trainer: ", currentUser);
            alert("Welcome " + currentUser.first_name);

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = '/trainer-menu.html';
        }
        else {
            console.log("Could not find Trainer in database", data.message);
            alert("Trainer account does not exist: " + data.message);
        }

    })
    .catch(err => {
        console.error("Error loggin in trainer: ", err)
    });

}

// function to get the current admin that is logged in
function loginAdmin() {

    console.log("Logging in Admin!");

    let input = document.getElementById('admin-email');
    let email = input.value;

    console.log("Admin Email: ", email);

    // request to check if the email is in the database
    fetch('/admin-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(data => {

        // if the email was found, log in the user and transfer them to their personal page
        if (data.success) {
            currentUser = data.trainer;
            console.log ("Logged in Admin: ", currentUser);
            alert("Welcome " + currentUser.first_name);

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = '/admin-menu.html';
        }
        else {
            console.log("Could not find Admin in database", data.message);
            alert("Admin account does not exist: " + data.message);
        }

    })
    .catch(err => {
        console.error("Error loggin in admin: ", err)
    });




}

init();