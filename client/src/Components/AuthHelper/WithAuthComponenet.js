import React, { Component } from 'react';
import AuthHelper from './AuthHelper';
const WithAuthComponent = (BaseComponent) => {
    const authHelper = new AuthHelper();
    return class extends Component {
        constructor( props ){
            super( props );
            this.state = {
                confirm: null, 
                loaded: false
            }
        }
        componentDidMount(){
            if(!authHelper.isLogIn()){
                this.props.history.replace('/');
            }else{
                try{
                    const confirm = authHelper.getConfirm(); 
                    this.setState({
                        confirm: confirm, 
                        loaded: true
                    })
                }catch (e){
                    console.log(e);
                    authHelper.logout();
                    this.props.history.replace('/')
                }
            }
        }
        render(){
            if(this.state.loaded === true && this.state.confirm){
                return <BaseComponent history={this.props.history} confirm={this.state.confirm} />
            }else{
                return null;
            }
        }
    }

}
export default WithAuthComponent;