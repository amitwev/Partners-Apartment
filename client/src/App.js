import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './Components/Register/Register.js';
import Login from './Components/Login/Login.js';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.js';
import Layout from './Components/Layout/Layout.js';
class App extends Component{
  constructor(){
    super(); 
    this.state = {
      route:'Login'
    }
  }
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/forgotpassword' component={ForgotPassword}/>
          <Route path='/homepage' component={Layout}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
