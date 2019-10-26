const Login = require('./server/Login.js'); 
const Main = require('./server/Main/Main');
module.exports = function(app){
    Login(app);
    Main(app);
}