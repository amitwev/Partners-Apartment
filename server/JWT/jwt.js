const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const s = 'amit salim auth partner apartment application';
const privateKey = exjwt({
    secret: s
  });

module.exports = {
    generateToken: function(email){
        return jwt.sign({ email: email }, s , { expiresIn: "2h" });
    },
    checkToken: function(){

    }, 
    validateRequest: function(){

    }, 
    getSecret: function(){
        return s;
    }, 
    getExpressJwt: function(){
        return privateKey; 
    }

}