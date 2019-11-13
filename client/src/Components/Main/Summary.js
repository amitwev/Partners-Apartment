import React, { Component } from 'react'; 
import AuthHelper from '../AuthHelper/AuthHelper'; 
import Loading from '../Loading/Loading';
const authHelper = new AuthHelper(); 

class Summary extends Component{
    constructor(){
        super();
        this.state = {
            id:'',
            email:'', 
            firstName:'',
            lastName:'',
            phone:'',
            apartmentId:'', 
            loading: true
        }
    }
    async getUserDetails(email){
        try{
            console.log("inside get user details");
            return await authHelper.fetch('getUserDetails', {
                method: 'POST',
                body:JSON.stringify({
                    email: email
                })
            });
        }catch(error){
            console.log("there was error fetch user details, ", error);
        }

    }
    async getUserApartment(email){
        try{
            console.log("THIS?, inside get user apartment id");
            return await authHelper.fetch('getUserApartmentId', {
                method: 'POST',
                body:JSON.stringify({
                    email: email
                })
            });
        }catch(error){
            console.log("there was error fetch user details, ", error);
        }
    }
    componentDidMount(){
        //{"rowCount":0,"rows":[]}
        //{"id":70,"email":"amit@glo.com","firstname":"amit","lastname":"wev","phone":"054625841"}
        const userEmail = localStorage.getItem('email');
        const userDetails = this.getUserDetails(userEmail);
        console.log("User details =", userDetails)
            Promise.all([ userDetails ])
            .then(([userDetails]) => {
                this.setState({
                    id:userDetails.id,
                    email:userDetails.email, 
                    firstName:userDetails.firstname,
                    lastName:userDetails.lastname,
                    phone:userDetails.phone,
                    apartmentId:userDetails.apartmentid, 
                    loading: false
                })
            })
    }
    render(){
        const {id, email , firstName, lastName, phone, apartmentId, loading } = this.state;
        console.log("inside the summary!, email = ", email)
        if(loading){
            return <Loading/>
        }
        else if(email === undefined || email === null){
            //Alert - Here create something nicer for email is not defined please logout -> login 
            return(
                <div>
                    emil = undefined/ null
                </div>
            )
        }else if(apartmentId === null){
            //Here need to assign new apartment to user -> log into one or set new apartment
            return(
                <div>
                    Missing apartment id
                </div>
            )
        }
        else{
            // user had apartment -> need to fetch data to show the user summary of apartment
            return(
                <div>
                    {`Hello ${id}, ${email} , ${firstName}, ${lastName}, ${phone} , ${apartmentId} END `}
                </div>
            )
        }   
    }
}
export default Summary;