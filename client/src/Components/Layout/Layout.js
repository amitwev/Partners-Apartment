import React, { Component } from 'react'; 
import { compose } from 'recompose'

import WithAuthComponent from '../AuthHelper/WithAuthComponenet';
import AuthHelper from '../AuthHelper/AuthHelper'; 

import Footer from './Footer'; 
import Header from './Header';
import UserDetails from '../Main/UserDetails';
import ApartmentDetails from '../Main/Apartment/ApartmentDetails'; 
import Summary from '../Main/Summary';
import Notes from '../Main/Notes';
import Loading from '../Loading/Loading';
//
import { Switch, BrowserRouter, Route, withRouter  } from 'react-router-dom';

const authHelper = new AuthHelper(); 
class Layout extends Component{
    constructor( props ){
        super( props );
        this.state = { 
            user:{
                email:'',
                firstName:'', 
                lastName:'', 
                phone:'',
                id:''
            },
            apartment:{
                id:'',
                name:'', 
                street:'',
                number:'',
                city:'',
                country:''
            }, 
            loading:true
        }
    }
    async getUserDetails(email){
        try{
            console.log("inside get user details");
            return await authHelper.fetch('/getUserDetails', {
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
        console.log("user Details from fetch =",userEmail, userDetails)
            Promise.all([ userDetails ])
            .then(([userDetails]) => {
                const user= userDetails.user;
                const apartment = userDetails.apartment;
                this.setState({
                    user: {
                        email:user.email,
                        firstName:user.firstname, 
                        lastName:user.lastname, 
                        phone:user.phone,
                        id:user.id
                    },
                    apartment:{
                        id:apartment.id,
                        name:apartment.name, 
                        street:apartment.street,
                        number:apartment.number,
                        city:apartment.city,
                        country:apartment.country
                    },
                    loading:false
                })
            })
    }
    render(){
        if(this.state.loading){
            return(
                <Loading />
            )
        }else{
            console.log("THE STATET = ", this.state)
            return( 
                <BrowserRouter>
                    <Header currentLocation={this.props.location.pathname}/>
                    <Switch>
                        <Route path="/Homepage" component={Summary}  exact/>
                        <Route path="/ApartmentDetails" render={() => 
                            <ApartmentDetails 
                                user={this.state.user} 
                                apartment={this.state.apartment}    />} 
                            exact   />
                        <Route path="/UserDetails" component={UserDetails} exact/>
                        <Route path="/Notes" component={Notes} user={this.state.user} apartment={this.state.apartment} exact/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            )
        }
    }
}
export default compose(
    WithAuthComponent,
    withRouter
)(Layout); 