module.exports = {
    queryObj: async function(obj){
        return new Promise(function(resolve, reject){
            let db = require('./dbConnection')();
            db.connect();
            console.log("inside the db query object");
            db.query(obj)
                .then(res => {
                    console.log("result", res)
                    resolve({
                        rowCount: res.rowCount, 
                        rows: res.rows
                    })
                })
                .catch((error) => {
                    console.log("inside catch for query");
                    reject(error)
                });
        })        
    }, 
    query: async function(str){
        return new Promise(function(resolve, reject){
            let db = require ('./dbConnection')();
            db.connect();
            console.log("inside DB simple select query"); 
            db.query(str)
                .then(res => {
                    resolve(res)
                })
                .catch(e => {
                    console.log("inside reject for select =", e);
                    reject(e)
                })
        })
    },
    getUserDetails: async function(email){
        return new Promise(function(resolve, reject){
            console.log("insid get user details");
            let db = require('./dbConnection')();
            db.connect();
            const query = {
                name: 'Get user details',
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email],
            }
            db.query(query, (err, res) => {
                if (err) {
                  console.log("inside the error", err)
                  reject(err)
                } else {
                  resolve(res);
                }
              })
        })
    },
}