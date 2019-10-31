import React, { Component } from 'react'; 
import AuthHelper from '../AuthHelper/AuthHelper'; 
const authHelper = new AuthHelper(); 

class Summary extends Component{
    constructor(){
        super();
        this.state = {
            userId:'',
            email:'', 
            firstName:'',
            lastName:'',
            phone:'',
            apartmentId:''
        }
    }
    async getUserDetails(email){
        try{
            console.log("inside get user details");
            const userDetails = await authHelper.fetch('getUserDetails', {
                method: 'POST',
                body:JSON.stringify({
                    email: email
                })
            });
            this.setState({
                userId: userDetails.id, 
                email: userDetails.email, 
                firstName: userDetails.firstName, 
                lastName: userDetails.lastName, 
                phone: userDetails.phone, 
            });
            console.log("this.state = ",this.state)
        }catch(error){
            console.log("there was error fetch user details, ", error);
        }

    }
    componentDidMount(){
        const userEmail = localStorage.getItem('email');
        this.getUserDetails(userEmail);
    }
    render(){
        const {email, firstName, lastName} = this.state;
        console.log("email = ", email)
        {if(email != null){
            return(
                <div>
                    {`Hello ${firstName} ${lastName}`}
                </div>
            )
        }else{
            return(
                <div>
                    inside the else
                </div>
            )
        }}
    }
}
export default Summary;