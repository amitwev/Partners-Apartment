import React, { Component } from 'react'; 
import WithAuthComponent from '../AuthHelper/WithAuthComponenet';

import Footer from '../Footer/Footer.js'; 
import Header from './Header';
import AuthHelper from '../AuthHelper/AuthHelper'; 
console.log(AuthHelper.fetch)
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
    componentDidMount(){
        const email = localStorage.getItem('email');
        // const userDetails = AuthHelper.fetch('/getUserDetails', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email: email
        //     })
        // });
        
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <Header />
                {/*
                    <Menu />
                    <Main />
                */}
                <Footer />
            </div>
        )
    }
}
export default WithAuthComponent(Layout); 