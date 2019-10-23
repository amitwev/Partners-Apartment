//THIS REQUIRE DB 
let db = require('./DB/dbConnection')();
//CONNECT AND QUERY

module.exports = function(app){
    //For user login 
    app.post('/login', (req, res) => {
        console.log("body = ",req.body);
        res.status(200).json({
            endPoint:'Login page', 
            api: 'Version 1'
        })
    })
    //For register new user 
    app.post('/Register', (req,res) => {
        let fUserAdd = false; 
        db.connect();
        const { email, firstName, lastName, phone, password } = req.body;
        console.log("inside register new user", email, firstName, lastName, phone, password ); 
        const query = {
        text: `insert into users("firstName", "lastName", email, phone) VALUES($1, $2, $3, $4)`,
        values: [firstName, lastName, email, phone]    
        }
        db.query(query, (err, user) => { 
        if (err) {
            console.log(err.detail);
            res.status(409).json(err.detail);
        }
        else{
            fUserAdd = true; 
            console.log(user);
            ///*
            res.status(200).json(user)
        }
        })
        if(fUserAdd){

        }
    })
    //For forgor password 
    app.post('/forgotPassword', (req,res) => {
        console.log("inside forgot password"); 
        res.status(200).json({
            endPoint:'forgot password -> reset password for user', 
            api: 'Version 1'
        })
    })
}