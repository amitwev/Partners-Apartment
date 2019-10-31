import React, { Component } from 'react'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AuthHelper from '../AuthHelper/AuthHelper'; 
import Loading from '../Loading/Loading'; 

const authHelper = new AuthHelper(); 
const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    pointer: {
      cursor:'pointer'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });
class UserDetails extends Component{
    constructor(){
        super(); 
        this.state = {
            userId:'',
            email:'', 
            firstName:'',
            lastName:'',
            phone:'',
            apartmentId:'', 
            loading: true,
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
                loading: false
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
        const { classes } = this.props;
        const {email, userId, firstName, lastName, phone, apartmentId, loading} = this.state;
        if(loading){
            console.log("inisde loading")
            return(
                <div>
                    <Loading />
                </div>
            )
        }
        return(
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Update user details
                    </Typography>
                    <form className={classes.form} noValidate name="register" onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={this.handleChange}
                            value={this.state.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            onChange={this.handleChange}
                            value={this.state.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Update
                        </Button>
                    </form>
                    </div>
                </Container>
            </div>
        )
    }
}
export default withStyles(styles)(UserDetails);