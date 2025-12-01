let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let updateProfileButton = document.getElementById('memberupdate');
const classDiv = document.getElementById('class-registration');

function init() {

    displayProfileData();
    displayFitnessClasses();
    updateProfileButton.addEventListener("click", updateProfile);

}

// function to display the profile data to the user
function displayProfileData() {

    document.getElementById("profile-firstname").innerText = "First Name: " + currentUser.first_name;
    document.getElementById("profile-lastname").innerText = "Last Name: " + currentUser.last_name;
    document.getElementById("profile-email").innerText = "Email: " + currentUser.email;
    document.getElementById("profile-dob").innerText = "Date of Birth: " + currentUser.date_of_birth;
    document.getElementById("profile-gender").innerText = "Gender: " + currentUser.gender;
    document.getElementById("profile-phone").innerText = "Phone Number: " + currentUser.phone_number;
    document.getElementById("profile-weight").innerText = "Weight: " + currentUser.weight;
    document.getElementById("profile-height").innerText = "Height: " + currentUser.height;
    document.getElementById("profile-heart").innerText = "Heart Rate: " + currentUser.heart_rate;
    document.getElementById("profile-goal").innerText = "Weight Goal: " + currentUser.weight_goal;


}

// function to display the classes
async function displayFitnessClasses() {

    const classes = await fetch('/view-classes');
    const data = await classes.json();

    classDiv.innerHTML = "";

    // add the classes
    data.classes.forEach(fc => {

        const newClass = document.createElement('div');
        newClass.innerHTML = `<p>${fc.class_name}</p>Time: ${fc.start_time} - ${fc.end_time}<p></p>
                                    <button data-class="${fc.class_id}">Register</button>`;

        classDiv.append(newClass);

        // add button functionality
        const registerButton = newClass.querySelector('button');
        registerButton.addEventListener('click', async () => {

            console.log("Attempting to register for class");

            try {

                const response = await fetch('/register-class', {

                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        memberId: currentUser.member_id,
                        classId: fc.class_id
                    })

                });

                const dataResult = await response.json();
                alert(dataResult.message);

            } 
            catch (err) {
                console.log(err);
                alert("Could not register for class");
            }

        });

    });

}

function updateProfile() {

    const newData = {

        first_name: document.getElementById("update-firstname").value,
        last_name: document.getElementById("update-lastname").value,
        email: document.getElementById("update-email").value,
        date_of_birth: document.getElementById("update-dob").value,
        gender: document.getElementById("update-gender").value,
        phone_number: document.getElementById("update-phone").value,
        weight: document.getElementById("update-weight").value,
        height: document.getElementById("update-height").value,
        heart_rate: document.getElementById("update-heart").value,
        weight_goal: document.getElementById("update-goal").value

    };

    fetch(`/member-update/${currentUser.member_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => {

        if (data.success) {
            alert("Your Profile Data has been updated!");
            localStorage.setItem("currentUser", JSON.stringify(data.member));
            displayProfileData()
        }
        else {
            alert("Profile could not be updated " + data.message);
        }

    })
    .catch(err => {
        console.error("Could not update profile: ", err)
    });

}

init();