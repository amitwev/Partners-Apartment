import React, { Component } from 'react'; 
import Footer from '../Footer/Footer,js'; 

class Layout extends Component{
    constructor(){
        super();
        this.state = { 
            email:'',
            firstName:'', 
            lastName:'', 
            phone:'',
            hasHouse:'', 
            
        }
    }
    render(){
        return(
            <div>
                
                <Footer />
            </div>
        )
    }
}
export default Layout; 