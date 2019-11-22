const jwt = require('../JWT/jwt');
const db = require('../DB/db');
const hashHandler = require('../hashHandler/hashHandler');

//columns in db = apartmentId, Name, street, number, city, country
module.exports = function(app){
    app.post('/addNewApartment', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside add new apartment")
        const { name, street, number, city, country, secret } = req.body;
        console.log("body = ", name, street, number, city, country, secret); 
        console.log("body = ", name, street, typeof(parseInt(number)), city, country, secret); 
        const secretHash = await hashHandler.encrypt(secret); 
        const queryStr = `INSERT INTO apartments (name, street, number, city, country, secret) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [name, street, parseInt(number), city, country, secretHash.hash];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        //console.log("result to update query = ",result)
        if(result.rowCount > 0 ){
            res.status(200).json(result);
        }else{
            res.status(409).json(result);
        }
    })
    app.get('/getApartmentDetails', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get apartment details")
    })
    app.post('/updateApartmentDetails',jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get apartment details")
    })
    app.get('/apartment/getApartmentsDetails', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside the apartment/ get apartment details ");
        const query = `SELECT apartmentid, name, street, city FROM apartments`;
        const result = await db.query(query); 
        console.log("result inside the get apartmnet = ",result)
        if(result.rowCount > 0 ){
            res.status(200).json({
                rowCount: result.rowCount, 
                rows: result.rows,
            });
        }else{
            res.status(409).json(result);
        }
    })
    app.post('/apartment/assignUserToApartment', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside assign user to new apartment",); 
        const { email, secret, apartmentid } = req.body; 
        let [ error, success ] = ['', null];
        //this is to get the apartment secret
        const apartmentQuery = `SELECT secret FROM apartments where apartmentid = $1`;
        const apartmentValues = [apartmentid];
        const apartmentSecretObj = {
            text: apartmentQuery, 
            values: apartmentValues
        }
        //This is to get if user is already assign to apartment
        const userApartmentQuery = `SELECT apartmentid FROM users where email = $1`;
        const userApartmentValue = [email];
        const userApartmentidObj = {
            text: userApartmentQuery, 
            values: userApartmentValue
        }
        //Promises
        const apartmentSecert = db.queryObj(apartmentSecretObj); 
        const userApartmentid = db.queryObj(userApartmentidObj); 
        //All promises 
        Promise.all([apartmentSecert, userApartmentid])
            .then(async ([apartmentSecert, userApartmentid]) => {
                console.log("apartment secret = ",apartmentSecert);
                console.log("user apartment = ", userApartmentid)
                if(apartmentSecert.rowCount > 0 && userApartmentid.rows[0].apartmentid === null){ 
                    console.log("inside if, before compare secrets")
                    const isSecretTrue = await hashHandler.compare(secret, apartmentSecert.rows[0].secret)
                    if(isSecretTrue){
                        //Right Secret -> assign user to apartment
                        const queryStr = `UPDATE users SET apartmentid = $1 where email=$2`;
                        const values = [apartmentid, email];
                        const queryObj = {
                            text: queryStr, 
                            values: values
                        }
                        const setUserToApartmentResult = await db.queryObj(queryObj);
                        console.log("after update user apartment =", setUserToApartmentResult)
                        if(setUserToApartmentResult.rowCount > 0){
                            success = true
                            error = ''
                            //user apartment id = true
                            res.status(200).json({
                                rowCount:1,
                                hasError:false, 
                                error: "",
                                success:true
                            })
                        }else{
                            //didnt update the DB -> return false
                            success = false
                            error = 'error update the user db'
                            res.status(409).json({
                                rowCount:0,
                                hasError:true, 
                                error: "error update the user db",
                                success:false 
                            })
                        }
                    }else{
                        success = false
                        error = 'Wrong Secret'
                        //Wrong Secret 
                        res.status(409).json({
                            rowCount:0,
                            hasError:true, 
                            error: "Wrong Secret",
                            success:false 
                        })
                    }
                }else{
                    success = true
                    error = 'could not find apartment or user is already assign to apartment'
                    res.status(409).json({
                        rowCount:0,
                        hasError:true, 
                        error: "could not find apartment or user is already assign to apartment",
                        success:false
                    });
                }
            })
            .catch((error) => {
                console.log("inside error in register = ", error)
                res.status(409).json({
                    hasError: true, 
                    details: error.detail
                })
            }) 
        // // here make if else to return
    }),
    app.post('/apartment/removeUserFromApartment', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside remove user from apartment");
        const { email } = req.body; 
        const queryStr = `UPDATE users SET apartmentid=null where email = $1`;
        const value = [email];
        const queryObj = {
            text: queryStr, 
            values: value
        }
        const result = await db.queryObj(queryObj); 
        console.log("response = ", result)
        if(result.rowCount > 0){
            res.status(200).json(result)
        }else{
            res.status(409).json(response)
        }
    }),
    app.post('/apartment/updateApartmentDetails', jwt.getExpressJwt(), async (req, res) => {
        try{
            const { id, name, street, number, city, country } = req.body; 
            console.log("inside update apartment", id, name, street, number, city, country);
            const queryStr = `UPDATE apartments SET name=$1, street=$2, number=$3, city=$4, country=$5 where apartmentid = $6`;
            const value = [ name, street, parseInt(number), city, country, id ];
            const queryObj = {
                text: queryStr, 
                values: value
            }
            const result = await db.queryObj(queryObj); 
            console.log("response = ", result)
            if(result.rowCount > 0){
                res.status(200).json(result)
            }else{
                res.status(409).json(result)
            }
        }catch(e){
            res.status(400).json(e);
        }
    })
}