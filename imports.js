const Login = require('./server/Login.js'); 
const Main = require('./server/Main/Main');
const Notes = require('./server/Main/Notes');
const Apartment = require('./server/Main/Apartment');
const User = require('./server/Main/User');
module.exports = function(app){
    Login(app);
    Main(app);
    Notes(app);
    Apartment(app);
    User(app)
}