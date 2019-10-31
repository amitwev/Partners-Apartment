import React, { Component } from 'react'; 
import { compose } from 'recompose'

import WithAuthComponent from '../AuthHelper/WithAuthComponenet';

import Footer from '../Footer/Footer.js'; 
import Header from './Header';
import AuthHelper from '../AuthHelper/AuthHelper'; 
import UserDetails from '../Main/UserDetails';
import ApartmentDetails from '../Main/ApartmentDetails'; 
import Summary from '../Main/Summary';
import Notes from '../Main/Notes';
//
import { Switch, BrowserRouter, Route, withRouter  } from 'react-router-dom';

const authHelper = new AuthHelper();
console.log(AuthHelper)
class Layout extends Component{
    constructor( props ){
        super( props );
        this.state = { 
            email:'',
            firstName:'', 
            lastName:'', 
            phone:'',
            hasHouse:'',
            route:'homepage'
        }
    }
    async componentDidMount(){
 
    }
 
    render(){
        return(
            <BrowserRouter>
                <Header currentLocation={this.props.location.pathname}/>
                <Switch>
                    <Route path="/Homepage" component={Summary} exact/>
                    <Route path="/ApartmentDetails" component={ApartmentDetails} exact/>
                    <Route path="/UserDetails" component={UserDetails} exact/>
                    <Route path="/Notes" component={Notes} exact/>
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}
export default compose(
    WithAuthComponent,
    withRouter
)(Layout); 