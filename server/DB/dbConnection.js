console.log("inside db connection");

const { Client } = require('pg'); 
module.exports = function(){
        const dbDetails = require('./dbDetailsStg.js');
        const env = process.env.NODE_ENV || 'development';
        let connectionString = {}; 
        if(env === 'production'){
            console.log("inside prodction db config");
            connectionString = {
                connectionString: process.env.DATABASE_URL,
                ssl: true
            };
        }else{
            console.log("not inside prodction db config");
            connectionString = {
                connectionString: dbDetails,
                ssl: true,
            }
        }
        return new Client(connectionString);
}