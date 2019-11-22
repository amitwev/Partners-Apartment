import React, { useState, Component } from 'react'; 
//import Button from '../Materials/Button';
import { Container, Typography, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import NewApartmentModal from './NewApartmentModal';
import AssignToApartmentModal from './AssignToApartmentModal';
import Modal from '../../Materials/Modal';
import AuthHelper from '../../AuthHelper/AuthHelper'; 
import Loading from '../../Loading/Loading';
import UserWithApartment from './UserWithApartment';
const authHelper = new AuthHelper();

const styles = theme => ({
    container: {
        marginTop: theme.spacing(4),
        alignItems: 'center',
        margin:'auto', 
        position:'inherit',
        textAlign:'center',
    },
    button: {
        margin: theme.spacing(1),
      },
    input: {
      display: 'none',
    },
    lineBreaker:{
        whiteSpace: 'pre-wrap'
    },
  });
  class ApartmentDetails extends Component{
    //({user, apartment}) 
      // after modal is open need to return false so this know modal is closed
    constructor(props){
        super(props);
        console.log("user props =", props.user)
        console.log("apartment props = ", props.apartment)
        this.state = {
            resultModal:{
                showModal:false,  
                responseModal:null,//This is which modal we need to show/ success or failed 
                title:'',
                content:'',
            },
            setupNewApartmentModal:{
                showModal:false, 
            },
            assignUserToApartment:{
                showModal:false
            },
            userDetails:this.props.user, 
            apartmentDetails:this.props.apartment,
            setupNewApartmentDetails:{ 
                name:'', 
                street:'', 
                number:'', 
                city:'', 
                country:'', 
                secret:'', 
            },
            loading:false,
            apartments:null,
            assignUserToApartmentDetails:{
                email:localStorage.getItem('email') || '', 
                apartmentid:'', 
                secret:''
            }
        }
    }
    setStatusModalForAddNewApartment = (bool) => {
        //this is the result from set new apartment modal
        this.loading();
        this.setState({
            setupNewApartmentModal:{
                showModal:false
            },
            resultModal:{
                showModal:true,
                responseModal:bool,
            },
            loading:false,
        })
    }
    openModal = async (modal) =>{
        this.loading();
        console.log("inside open modal");
        let apartments = null;
        if(modal === 'assignUserToApartment'){
            console.log("inside modal open in if");
            apartments = await authHelper.fetch('/apartment/getApartmentsDetails');
        }
        this.setState({
            [modal]:{
                showModal:true
            },
            apartments: apartments,
            loading:false,
        })
    }
    closeModal = (modal) => {
        this.loading();
        console.log("inside close modal")
        this.setState({
            [modal]:{
                showModal:false
            }, 
            loading:false
        })
    }
    saveNewApartment = async () => {
        this.loading();
        console.log("new apartment save function click");
        //here need to give all the parameters from the modal and then fetch data to '/addNewApartment' end point 
        // show message if save ok or not 
        console.log("the state = ", this.state);
        const url ='/addNewApartment'; 
        const options = {
            method:'POST', 
            body:JSON.stringify(this.state.setupNewApartmentDetails), 
            }
        const res = await authHelper.fetch(url, options); 
        let responseModal = null;
        if(res.rowCount > 0){
            responseModal = true
        }else{
            responseModal  = false;
        }
        this.setState({
            resultModal:{
                showModal:true,  
                responseModal:responseModal,//This is which modal we need to show
                title:(res.rowCount > 0)? `Success!`: `'Error!'`,
                content:(res.rowCount > 0)? `Your apartment added.\nDon't forget the secret key!`: `Please try again\n There was an error while trying to add your apartment`
            },
            setupNewApartmentModal:{
                showModal:false, 
            },
            loading:false,
        }, () => console.log("state updaed after save ", this.state))
    }
    handleChange = (event) => {
        this.loading();
        console.log('firstState = ',this.state)
        console.log(event.target);
        const name = event.target.name;
        const id = event.target.id;
        const value = event.target.value;
        console.log("change: ", name, id, value, ", id = ", id)
        let temp = this.state[name];
        temp[id] = value; 
        this.setState({
            [name]:temp,
            loading:false
        }, () => console.log("state update = ", this.state));
    }
    saveAssignUserToApartment = async () => {
        this.loading();
        console.log("assign user to apartment", this.state.assignUserToApartmentDetails);
        const url = '/apartment/assignUserToApartment';
        const options = {
            method:'POST', 
            body: JSON.stringify(this.state.assignUserToApartmentDetails)
        }
        const result = await authHelper.fetch(url, options); 
        console.log(result);
        this.setState({
            resultModal:{
                showModal:true,  
                responseModal:result.success && !result.hasError,//This is which modal we need to show/ success or failed \
                title:(result.success)? `Success!`: 'Error!', 
                content:(result.success)? `You are now assign to the apartment`: `There was an error, Please try again!`
            },
            assignUserToApartment:{
                showModal:false
            },
            loading: false,
        })
    }
    loading = () => {
        this.setState({
            loading:true
        })
    }
    updateApartmentDetails = async (event) => {
        try{
            event.preventDefault();
            this.loading(); 
            const data = JSON.stringify(this.state.apartmentDetails);
            console.log("inside update apartment details, data = ", data);
            const url ='/apartment/updateApartmentDetails'; 
            const options ={ 
                method:'POST', 
                body: JSON.stringify(this.state.apartmentDetails)
            }
            const apartmentUpdate = await authHelper.fetch(url, options);
            console.log("result from uupdate apartment =", apartmentUpdate);
            this.setState({
                resultModal:{
                    showModal:true,  
                    responseModal:(apartmentUpdate.rowCount > 0),//This is which modal we need to show/ success or failed 
                    title:(apartmentUpdate.rowCount > 0)? 'Success':'Error',
                    content:(apartmentUpdate.rowCount > 0)? 'Your apartment details updated':'Please try again!',
                },
                loading:false
            })
        }catch(e){
            console.log(e)
        }
    }
    render(){
        console.log("STATE in render apartment =" ,this.state)
        const { classes } = this.props;
        if(this.state.loading){
            return(
                <Loading />
            )
        }
        else if(!this.state.apartmentDetails.id){
            //user that dont have apartment -> assign or create new apartment
            return(
                <div>
                    <Container component="main" fixed className={classes.container}>
                        <Typography className={classes.lineBreaker}>
                            {`Hello ${this.state.userDetails.firstName.toUpperCase()}\n seems that you are not assign to any apartment yet`}
                        </Typography>
                        <Typography component="div">
                            {//there is modal need to open it by  state \title={'sign in to apartment'}
                            }
                            <Button 
                                variant="contained" 
                                color={'primary'}  
                                className={classes.button}
                                onClick={() => {
                                    this.openModal('setupNewApartmentModal');
                                    console.log('click on open button')
                                }}>
                                Setup new apartment
                            </Button>
                            <Button 
                                variant="contained" 
                                color={'primary'}  
                                className={classes.button}
                                onClick={() => {

                                    this.openModal('assignUserToApartment');
                                    console.log('click on open button')
                                }}>
                                sign in to apartment
                            </Button>
                        </Typography>
                    </Container>
                    {//this is to show modal for add new apartment
                        (this.state.setupNewApartmentModal.showModal)?
                            <NewApartmentModal show={true} 
                                                setStatusModalForAddNewApartment={this.setStatusModalForAddNewApartment}
                                                closeModal={this.closeModal}
                                                handleChange={this.handleChange}
                                                saveNewApartment={this.saveNewApartment}
                                                setupNewApartmentDetails={this.state.setupNewApartmentDetails}/> 
                        :<div></div>
                    }
                    {//this is to show modal for assign to apartment
                        (this.state.assignUserToApartment.showModal)?
                            <AssignToApartmentModal     show={true}
                                                        handleChange={this.handleChange}
                                                        closeModal={this.closeModal}
                                                        apartments={this.state.apartments}
                                                        assignUserToApartmentDetails={this.state.assignUserToApartmentDetails}
                                                        saveAssignUserToApartment={this.saveAssignUserToApartment}/>
                        :<div></div>

                    }
                    {// this is to show result for add new apartment - need to add option for assign to new apartment
                    (this.state.resultModal.showModal)?
                                <Modal showModal={true} 
                                        status={true} 
                                        closeModal={this.closeModal}
                                        title={this.state.resultModal.title}
                                        content={this.state.resultModal.content}/> 
                        :<div></div>        
                    }    
                </div> 
            )
        }else{
            //handle users that assign to exist apartment
            return(
                <div>
                    <UserWithApartment apartment={this.state.apartmentDetails} 
                                       handleChange={this.handleChange}
                                       updateApartmentDetails={this.updateApartmentDetails}/>
                    {// this is to show result for add new apartment - need to add option for assign to new apartment
                    (this.state.resultModal.showModal)?
                    <Modal showModal={true} 
                            status={true} 
                            closeModal={this.closeModal}
                            title={this.state.resultModal.title}
                            content={this.state.resultModal.content}/> 
                        :<div></div>        
                    }
                </div>
            )
        }
    }
}
export default withStyles(styles)(ApartmentDetails);