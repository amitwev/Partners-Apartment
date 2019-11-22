//Tokens
const jwt = require('./JWT/jwt.js'); 
//THIS REQUIRE DB 
let db = require('./DB/db.js');
const passHandler = require('./hashHandler/hashHandler.js'); 
//CONNECT AND QUERY

module.exports = function(app){
    //For user login 
    app.post('/login', async (req, res) => {
        const { email, password } = req.body; 
        console.log("email = ", email , ", pass = ", password);
        const query = {
            text: `SELECT * FROM userspassword where email = $1`, 
            values: [email]
        }
        const result = await db.queryObj(query); 
        console.log("result from query db = ", result);
        if(result.rowCount > 0 && email === result.rows[0].email && await passHandler.compare(password, result.rows[0].password)){
            console.log("same user, can connect"); 
            let token = jwt.generateToken(email);
            res.status(200).json({
                success: true, 
                hasError:false,
                token,
            })
        }else{
            console.log("not same user in login"); 
            res.status(401).json({
                success: false,
                hasError:true,
                token: null
            })
        }
     })

    //For register new user 
    app.post('/Register', async (req,res) => {
        const { email, password, firstName, lastName, phone } = req.body;
        const queryUser = {
            text: `insert into users("firstname", "lastname", email, phone) VALUES($1, $2, $3, $4)`,
            values: [firstName, lastName, email, phone]    
        }
        const hashPassword = await passHandler.encrypt(password); 
        const queryPass = {
            text: `INSERT INTO userspassword (email, password) VALUES ($1, $2)`, 
            values:[email, hashPassword.hash]
        }
        const resultUser = db.queryObj(queryUser)
        const resultPass = db.queryObj(queryPass)
        Promise.all([resultUser, resultPass])
            .then((values) => {
                if(values[0].rowCount == 1 && values[1].rowCount == 1){ 
                    console.log("inside user added");
                    res.status(200).json({
                        hasError: false, 
                        userAdded: true, 
                        password:true
                    })
                }
            })
            .catch((error) => {
                console.log("inside error in register = ", error)
                res.status(409).json({
                    hasError: true, 
                    details: error.detail
                })
            }) 
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