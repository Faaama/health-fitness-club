const {Pool} = require('pg');

const pool = new Pool({

    host:"localhost",
    user: "postgres",
    port: 5432,
    password: "kutchipatchi",
    database: "FitnessClubSystem"

});

pool.connect()
    .then(()=> console.log("Connected to database"))
    .catch(err => console.error("Failed to connect to database"));

module.exports = pool;