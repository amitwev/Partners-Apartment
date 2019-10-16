import React, { Component } from 'react';
import './App.css';

import Register from './Components/Register/Register.js';
import Login from './Components/Login/Login.js';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.js';

class App extends Component{
  constructor(){
    super(); 
    this.state = {
      route:'Login'
    }
  }
  onRouteChange = (path) => {
    console.log("on route change click = ", path)
    this.setState({
      route:path
    })
  }
  render(){
      switch(this.state.route){
        case 'Login':
          return(
            <Login onRouteChange={this.onRouteChange}/>
          )
        case 'Register': 
          return(
            <Register onRouteChange={this.onRouteChange}/>
          )
        case 'ForgotPassword': 
          return(
            <ForgotPassword onRouteChange={this.onRouteChange}/>
          )
        default:
            return(
              <div>
                Homepage!
              </div>
            )
      }
  }
}

export default App;
