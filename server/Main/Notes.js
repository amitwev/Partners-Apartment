const jwt = require('../JWT/jwt');
const db = require('../DB/db');

module.exports = function(app){
    app.get('/getAllNotes', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get all  notes")
    })
    app.post('/addNewNote', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside add notes")
    })
}