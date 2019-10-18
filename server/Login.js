module.exports = function(app){
    //For user login 
    app.post('/login', (req, res) => {
        console.log("body = ",req.body);
        console.log("inside /login!");
        res.status(200).json({
            endPoint:'Login page', 
            api: 'Version 1'
        })
    })
    //For register new user 
    app.post('/Register', (req,res) => {
        console.log("inside register new user"); 
        res.status(200).json({
            endPoint:'Regiuster new user', 
            api: 'Version 1' 
        })
    })
    //For forgor password 
    app.post('/forgotPassword', (req,res) => {
        console.log("inside forgot password"); 
        res.status(200).json({
            endPoint:'forgot password -> reset password for user', 
            api: 'Version 1'
        })
    })
}