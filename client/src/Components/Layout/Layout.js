import React, { Component } from 'react'; 
import { compose } from 'recompose'

import WithAuthComponent from '../AuthHelper/WithAuthComponenet';
import AuthHelper from '../AuthHelper/AuthHelper'; 

import Footer from './Footer'; 
import Header from './Header';
import UserDetails from '../Main/UserDetails';
import ApartmentDetails from '../Main/ApartmentDetails'; 
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
            },
            apartment:{
                hasApartment:'',
                apartmentid:''
            }, 
            loading:true
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
            console.log("inside get user apartment id");
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
            Promise.all([ userDetails ])
            .then(([userDetails]) => {
                this.setState({
                    user:{
                        id:userDetails.id,
                        email:userDetails.email, 
                        firstName:userDetails.firstname,
                        lastName:userDetails.lastname,
                        phone:userDetails.phone,
                    },
                    apartment:{
                        apartmentId:userDetails.apartmentid, 
                    },
                    loading: false
                })
            })
            .then(console.log(this.state))
    }
    render(){
        if(this.state.loading){
            return(
                <Loading />
            )
        }else{
            return( 
                <BrowserRouter>
                    <Header currentLocation={this.props.location.pathname}/>
                    <Switch>
                        <Route path="/Homepage" component={Summary} exact/>
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