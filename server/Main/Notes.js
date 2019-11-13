const jwt = require('../JWT/jwt');
const db = require('../DB/db');

module.exports = function(app){
    app.get('/getAllNotes', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside get all  notes")
    })
    app.post('/addNewNotes', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside add new note")
        const { apartmentid, name, content } = req.body; 
        const queryStr = `INSERT INTO notes (apartmentid, name, content) values ($1, $2, $3)`;
        const values = [apartmentid, name, content];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        console.log("result to update query = ",result)
        res.status(200).json(result);
    })
    app.put('/updateExistNote', jwt.getExpressJwt(), async (req, res) => {
        console.log("inside update exist note")
        const {id, name, content} = req.body; 
        const queryStr = `UPDATE notes SET name=$1, content=$2, where id=$3`;
        const values = [id, name, content];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        console.log("result to update query = ",result)
        res.status(200).json(result);
    })
    app.put('/deleteNote', jwt.getExpressJwt(), async (req, res) => {
        // right now cant revert delete -> maybe need to show all delete notes in modal in table 
        console.log("inside delete note")
        const {id} = req.body; 
        const queryStr = `UPDATE notes SET isDeleted=true where id=$1`;
        const values = [id];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        console.log("result to delete query = ",result)
        res.status(200).json(result);
    })
    app.put('/toggleNoteIsDone', jwt.getExpressJwt(), async (req, res) => {
        //Need to send the done parameter!
        console.log("inside is done note")
        const {id, isDone} = req.body; 
        const queryStr = `UPDATE notes SET isDone=$1 where id=$2`;
        const values = [!isDone, id];
        const queryObj = {
            text: queryStr, 
            values: values
        }
        const result = await db.queryObj(queryObj); 
        console.log("result to delete query = ",result)
        res.status(200).json(result);
    })
}