import decode from 'jwt-decode';

class AuthHelper{
    constructor(domain){
        this.domain = domain || "http://localhost:3000";
    }

    login = (email, password) => {

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
        const headers = {
            'Content-Type': 'application/json'
        }
        if(this.isLogIn()){
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        return fetch(url, {
            headers, 
            ...options
        })
            .then(this.checkStatusResponse)
            .then(response => response.json())
    }
    checkStatusResponse = (response) => {
        if(response.status === 200){

        }else{
            const error = new Error(response.statusText)//Need to check this one !
            error.response = response; 
            throw error;
        }
    }
}

export default AuthHelper; 