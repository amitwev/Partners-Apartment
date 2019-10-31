const jwt = require('../JWT/jwt');
const db = require('../DB/db');
//columns in db = apartmentId, Name, street, number, city, country
module.exports = function(app){
    app.post('/addNewApartment', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside add new apartment")
    })
    app.get('/getApartmentDetails', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get apartment details")
    })
    app.post('/updateApartmentDetails',jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get apartment details")
    })
}