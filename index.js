const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');

const app = express(); 

app.use(bodyParser.json());

require('./imports.js')(app);

const PORT = process.env.PORT || 3001; 
//Basic Site - Node + react + db connection 
/*need to delete 
//db.connect();
//db.query('SELECT * FROM users;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   db.end();
/// });
*/
app.get('/api', (req, res) => {
    console.log("Inside /api");
    res.status(200).json({
        endPoint:'api call to /api', 
        api: 'Version 1'
    })
})
// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
  
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
//   }
app.listen(PORT, () => {
    console.log(`app is running on port =  ${PORT}`)
})