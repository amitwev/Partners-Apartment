const jwt = require('../JWT/jwt');
const db = require('../DB/db');
//columns in db = apartmentId, Name, street, number, city, country
module.exports = function(app){
    app.put('/updateExistUser', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside update exist user");
        const { id, firstname, lastname, phone, email } = req.body;
        console.log("user details = ", id, firstname, lastname, phone, email);
        const queryStr = `UPDATE users SET lastname=($2), firstname=($1), phone=($3), email=($4) WHERE id = ($5)`;
        const values = [firstname, lastname, phone, email, id];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        console.log("result to update query = ",result)
        res.status(200).json(result);
    })
}
