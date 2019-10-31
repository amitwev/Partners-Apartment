import decode from 'jwt-decode';

class AuthHelper{
    constructor(domain){
        this.domain = domain || "http://localhost:3000";
    }
    isLogIn = () => {
        const token = this.getToken(); 
        return !!token && !this.isTokenExpired(token); 
    }
    getConfirm = () => {
        let answer = decode(this.getToken());
        //console.log("Recieved answer!", answer);
        return answer;
    }
    isTokenExpired = (token) => {
        try{
            const decodeToken = decode(token);
            //console.log("token expires: ", decodeToken.exp); 
            //console.log("now date = ", Date.now());
            if(decodeToken.exp < Date.now() / 1000){
                return true; 
            }else return false;
        }catch(e){
            console.log("there is error in token expires = ", e); 
            return false; // MAY BE NEED TO CHANE IT TO true!!
        }       
    }
    setToken = (token) => {
        localStorage.setItem("token", token);
    }
    getToken = () => {
        return localStorage.getItem("token");
    }
    logout = () => {
        localStorage.removeItem("token");
    }
    fetch = (url, options) => {
        console.log("inside fetch helper", url, options)
        const headers = {
            'Content-Type': 'application/json'
        }
        if(this.isLogIn()){
            console.log("added auth")
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        console.log("headers = ",  headers); 
        console.log("url = ", url, "options = ", options)
        return fetch(url, {
            headers, 
            ...options
        })
            .then(response => {
                console.log("response from server = ", response)
                return response.json()
            })
            .catch(e => {
                console.log("something wrong is fetch")
                throw e;
            })
    }
    checkStatusResponse = (response) => {
        if(response.status === 200){
            return response;
        }else{
            const error = new Error(response.statusText)//Need to check this one !
            console.log("The error from chek = ", error);
            error.response = response; 
            throw error;
        }
    }
}

export default AuthHelper; 