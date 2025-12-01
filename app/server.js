const express = require ('express');
const db = require ('./database');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Test route works!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// Member Login
app.post('/member-login', async (req, res) => {

    const {email} = req.body;

    try {

        const result = await db.query('SELECT * FROM Members WHERE email = $1', [email]);

        console.log("Database result", result.rows);

        // check if there is a result
        if (result.rows.length > 0) {
            res.json({success: true, member: result.rows[0]});
        }
        else {
            res.json({success: false, message: "Member not found"});
        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching member email');
    }


});

// Member Registration
app.post('/member-registration', async (req, res) => {

    const {first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal } = req.body;

    try {

        const result = await db.query(`insert into Members (first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal) values
                                        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`, 
                                        [first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal]);

        res.json({success: true, member: result.rows[0]});


    }
    catch (err){

        console.error(err);
        res.status(500).json({success: false, message: "Error, could not register new member"});

    }

});

// Member Profile Update
app.put('/member-update/:memberId', async (req, res) => {

    const {memberId} = req.params;
    const {first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal} = req.body;

    try {

        const result = await db.query( `update Members set first_name = $1, last_name = $2, email = $3, date_of_birth = $4, gender = $5, phone_number = $6, weight = $7, height = $8, heart_rate = $9, weight_goal = $10 WHERE member_id = $11 RETURNING *`,
                                        [first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal, memberId]);

        if (result.rows.length > 0) {
            res.json({success: true, member: result.rows[0]});
        }
        else {
            res.json({success: false, message: "Error finding member"});
        }

    }
    catch (err) {
        res.status(500).json({success: false, message: "Error updating profile"});
    }


});

// Member display fitness classes
app.get('/view-classes', async (req, res) => {

    try {
        const result = await db.query(`SELECT fc.class_id, fc.class_name, fc.capacity, a.start_time, a.end_time FROM FitnessClass fc
                                        JOIN Availability a ON fc.availability_id = a.availability_id`);

        res.json({success: true, classes: result.rows});

    }
    catch (err) {
        res.status(500).json({success: false, message: "Could not find fitness classes"});
    }

});

// Member register for fitness class
app.post('/register-class', async (req, res) => {

    const {memberId, classId} = req.body;
    console.log(req.body);

    try {

        const result = await db.query(`SELECT fc.capacity, a.start_time, a.end_time FROM FitnessClass fc
                                        JOIN Availability a ON fc.availability_id = a.availability_id
                                        WHERE fc.class_id = $1`, [classId]);

        const fitnessClass = result.rows[0];

        // check capacity by checking occurances in Registers table
        const classCapacity = await db.query(`SELECT COUNT(*) as classCount FROM Registers WHERE class_id = $1`, [classId]);
        if (parseInt(classCapacity.rows[0].classCount) >= fitnessClass.capacity) {
            return res.json({ success: false, message: "Class is full"});
        }

        // check scheduling conflicts
        const conflict = await db.query(`SELECT * FROM MemberSchedule WHERE member_id = $1
                                        AND start_time = $2`, [memberId, fitnessClass.start_time]);

        if (conflict.rows.length > 0) {
            return res.json({success: false, message: "Scheduling Conflict"});
        }

        await db.query (`insert into Registers (member_id, class_id) VALUES ($1, $2)`, [memberId, classId]);

        res.json({success: true, message: "Registered for class!"})

    }
    catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "Could not register for fitness class"});
    }


});

// Trainer Login
app.post('/trainer-login', async (req, res) => {

    const {email} = req.body;

    try {

        const result = await db.query('SELECT * FROM Trainer WHERE email = $1', [email]);

        console.log("Database result", result.rows);

        // check if there is a result
        if (result.rows.length > 0) {
            res.json({success: true, trainer: result.rows[0]});
        }
        else {
            res.json({success: false, message: "Trainer not found"});
        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching trainer email');
    }


});

// Trainer Schedule View - PT Sessions
app.get("/trainer-sessions/:trainerId", async (req, res) => {

    const {trainerId} = req.params;

    try {

        // select session values, start and end time - get pt sessions based on availability where trainerid is currentUser
        const result = await db.query(`SELECT pt.session_id, pt.member_id, pt.room_id, a.start_time, a.end_time FROM PTSession pt
                                        JOIN Availability a ON pt.availability_id = a.availability_id WHERE a.trainer_id = $1`, [trainerId]);
        res.json({success: true, pt_sessions: result.rows});

    }
    catch (err) {
        console.error(err);
        res.status(500).json({success: false, error: "Failed to retrieve assigned pt sessions"});
    }

});

// Trainer Schedule View - Group classes
app.get("/trainer-classes/:trainerId", async (req, res) => {

    const {trainerId} = req.params;

    try {

        // select class values, start and end time - get group classes based on availability where trainerid is currentUser
        const result = await db.query(`SELECT fc.class_id, fc.class_name, fc.room_id, a.start_time, a.end_time FROM FitnessClass fc
                                        JOIN Availability a ON fc.availability_id = a.availability_id WHERE a.trainer_id = $1`, [trainerId]);
        res.json({success: true, fitness_classes: result.rows});

    }
    catch (err) {
        console.error(err);
        res.status(500).json({success: false, error: "Failed to retrieve assigned group classes"});
    }

});

// Admin Login
app.post('/admin-login', async (req, res) => {

    const {email} = req.body;

    try {

        const result = await db.query('SELECT * FROM Administrator WHERE email = $1', [email]);

        console.log("Database result", result.rows);

        // check if there is a result
        if (result.rows.length > 0) {
            res.json({success: true, admin: result.rows[0]});
        }
        else {
            res.json({success: false, message: "Admin not found"});
        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching admin email');
    }


});