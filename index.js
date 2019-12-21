const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
require('./imports.js')(app);

const jwt = require('./server/JWT/jwt.js'); 

const PORT = process.env.PORT || 3001; 
console.log(process.env.NODE_ENV)
//Set headers
app.use((req, res, next) => {
  console.log(req.headers);
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.get('/root', (req,res) => {
  console.log("inside the root");
  res.status(200).json({
    endPoint:'api call to /root', 
    api: 'Version 1'
  })
})

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

app.listen(PORT, () => {
    console.log(`app is running on port =  ${PORT}`)
})