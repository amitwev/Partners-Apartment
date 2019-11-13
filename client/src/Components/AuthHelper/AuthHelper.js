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
        return answer;
    }
    isTokenExpired = (token) => {
        try{
            const decodeToken = decode(token);
            if(decodeToken.exp < Date.now() / 1000){
                return true; 
            }else return false;
        }catch(e){
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
            .then(response => {
                return response.json()
            })
            .catch(e => {
                throw e;
            })
    }
    checkStatusResponse = (response) => {
        if(response.status === 200){
            return response;
        }else{
            const error = new Error(response.statusText)//Need to check this one !
            error.response = response; 
            throw error;
        }
    }
}

export default AuthHelper; 