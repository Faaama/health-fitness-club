const db = require('./database');

// test query!
db.query('Select * from Members', (err,res)=> {
    
    if(!err)
    {
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }

    //db.end();
});