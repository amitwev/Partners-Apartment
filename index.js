const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
require('./imports.js')(app);

const jwt = require('./server/JWT/jwt.js'); 

const PORT = process.env.PORT || 3001; 
//Set headers
app.use((req, res, next) => {
  console.log(req.headers);
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//need to add this to every request -> using the token -> and need to use exjwt to every file
app.get('/api', jwt.getExpressJwt(), (req, res) => {
    console.log("Inside /api");
    res.status(200).json({
        endPoint:'api call to /api', 
        api: 'Version 1'
    })
})
app.get('/homepage', jwt.getExpressJwt(), (req,res) => {
  console.log("Web Token Checked.");
  res.send('You are authenticated');
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