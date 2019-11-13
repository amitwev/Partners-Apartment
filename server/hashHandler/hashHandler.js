const bcrypt = require('bcrypt'); 
console.log("inside hash handler ");
const saltRounds = 10;
module.exports = {
    encrypt: async function(password){
        return new Promise(function(resolve, reject){
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err); 
                else{
                    console.log("new hash password = ", hash);
                    const passHass = {
                        hash: hash
                    }
                    resolve(passHass); 
                }
              });
        })
    },
    compare: async function(password, hashPassword){
        return new Promise(function(resolve, reject){
            bcrypt.compare(password, hashPassword, function(err, res){
                if (err) reject(err); 
                else{ 
                    console.log("password compare res = , ", res); 
                    resolve(res);
                }
            })
        })
    },
}