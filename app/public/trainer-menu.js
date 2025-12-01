const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const trainerId = currentUser.trainer_id;

function init() {

    console.log("Opened page for: ", currentUser.first_name);

    displayScheduleView();


}

// display the trainer's schedule
function displayScheduleView() {

    // display the PT Sessions
    fetch(`/trainer-sessions/${trainerId}`)
        .then(res => res.json())
        .then(data => {

            const ptDiv = document.getElementById('ptsession')
            ptDiv.innerHTML = "";

            const newSession = document.createElement("div");

            if(!data.pt_sessions) {

                ptDiv.innerHTML = `<p>No PT Sessions</p><br>`
                
            }

            data.pt_sessions.forEach(ptsession => {

                newSession.innerHTML = `
                <p>SessionID: ${ptsession.session_id}</p>
                <p>For Member ID: ${ptsession.member_id}, in Room ${ptsession.room_id}</p>
                <p>From ${ptsession.start_time} to ${ptsession.end_time}</p><br> 
                `

                ptDiv.appendChild(newSession);


            });

        });

    // display the group classes
    fetch(`/trainer-classes/${trainerId}`)
        .then(res => res.json())
        .then(data => {

            const fcDiv = document.getElementById('fitnessclass')
            fcDiv.innerHTML = "";

            const newClass = document.createElement("div");

            if(!data.fitness_classes) {

                ptDiv.innerHTML = `<p>No Fitness Classes</p><br>`
                
            }

            data.fitness_classes.forEach(fitnessclass => {

                newClass.innerHTML = `
                <p>ClassID: ${fitnessclass.class_id}</p>
                <p>Name: ${fitnessclass.class_name}, in Room ${fitnessclass.room_id}</p>
                <p>From ${fitnessclass.start_time} to ${fitnessclass.end_time}</p><br> 
                `

                fcDiv.appendChild(newClass);


            });

        });

}


init();