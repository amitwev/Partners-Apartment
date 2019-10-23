const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
require('./imports.js')(app);

// //THIS REQUIRE DB 
// let db = require('./server/DB/dbConnection')();
// //CONNECT AND QUERY
// console.log("connected to db");
// db.connect();
// const query = {
//   text: `insert into users("firstName", "lastName", email, phone) VALUES($1, $2, $3, $4)`,
//   values: ['brianc', '','', 'testing']    
//   }

// db.query(query, (err, res) => { 
//   if (err) console.log(err.detail);
//   else{
//     console.log(res)
//   }
// })
// //END 

const PORT = process.env.PORT || 3001; 

app.get('/api', (req, res) => {
    console.log("Inside /api");
    res.status(200).json({
        endPoint:'api call to /api', 
        api: 'Version 1'
    })
})
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
app.listen(PORT, () => {
    console.log(`app is running on port =  ${PORT}`)
})