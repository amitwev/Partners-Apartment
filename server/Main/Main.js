const jwt = require('../JWT/jwt');
const db = require('../DB/db');

module.exports = function(app){
    app.post('/getUserDetails', jwt.getExpressJwt(), async (req, res) => {
        const { email } = req.body; 
        console.log("inside get user details", req.body);
        const userDetails = await db.getUserDetails(email);
        console.log("details from user", userDetails);
        if(userDetails.rows.length > 0 ){
            console.log("inside the if")
            res.status(200).json(userDetails.rows[0])
        }else{
            console.log("inside the else")
            res.status(404).json({
                hasError: true, 
            })
        }
    })
}