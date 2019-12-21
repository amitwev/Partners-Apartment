console.log("inside db connection");

const { Client } = require('pg'); 
module.exports = function(){
        // This is for heroku 
        // const dbDetails = require('./dbDetailsStg.js');
        // const env = process.env.NODE_ENV || 'development';
        // let connectionString = {}; 
        // if(env === 'production'){
        //     console.log("inside prodction db config");
        //     connectionString = {
        //         connectionString: process.env.DATABASE_URL,
        //         ssl: true
        //     };
        // }else{
        //     console.log("not inside prodction db config");
        //     connectionString = {
        //         connectionString: dbDetails,
        //         ssl: true,
        //     }
        // }
        /* Here connection to AWS */
        if(process.env == 'PRODUCTION'){
            console.log("inside PRODUCTION!"); 
        }else{
            console.log("NOT INSIDE PRODUCTION")
        }
        const dbConfig = {
            user: 'amitwev',
            password: 'CCK00kv2in6HR()K',
            database: 'postgres',
            host: 'db-partners-apartment.crhdkgfhijw2.us-west-2.rds.amazonaws.com',
            port: 5427
        };
        const client = new Client(dbConfig);
        return new Client(client);
}