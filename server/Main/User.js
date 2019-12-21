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
    }),
    app.post('/getUserDetails', jwt.getExpressJwt(), async (req, res) => {
        try{    
            const { email } = req.body; 
            console.log("inside get user details", req.body);
            const query = `select *
                            from users
                            where email=$1`
            const value = [email]
            const obj = {
                text: query, 
                values: value
            }
            const userDetails = await db.queryObj(obj)
            console.log("details from user", userDetails);
            if(userDetails.rows.length > 0 ){
                const user = {
                        id: userDetails.rows[0].id, 
                        email: userDetails.rows[0].email, 
                        firstname: userDetails.rows[0].firstname, 
                        lastname: userDetails.rows[0].lastname, 
                        phone:userDetails.rows[0].phone, 
                }
                const apartment = {
                        id: userDetails.rows[0].apartmentid, 
                        name:userDetails.rows[0].apartmentname, 
                        street: userDetails.rows[0].apartmentstreet, 
                        number:userDetails.rows[0].apartmentnumber, 
                        city:userDetails.rows[0].apartmentcity, 
                        country:userDetails.rows[0].apartmentcountry, 
                }
                console.log("inside the if", userDetails)
                console.log("this is user obj = ", user)
                console.log("this is apartment = ", apartment)
                res.status(200).json({
                    user: user, 
                    apartment: apartment
                })
            }else{
                console.log("inside the else")
                res.status(404).json({
                    hasError: true, 
                    error: userDetails
                })
            }
        }
        catch(e){
            res.status(409).json(e)
        }
    })
}
