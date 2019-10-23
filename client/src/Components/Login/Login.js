import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, withStyles, Typography, Container } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Footer from '../Footer/Footer.js'; 

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component{
  constructor(){
    super();
    this.state = {
      email:'', 
      password:''
    }
  }
  handleChange = (event) => {
    const name = event.target.name; 
    const value = event.target.value; 
    this.setState({
      [name]: value
    })
    console.log("state = ", this.state)
  }
  onSubmit = (event) => {
    console.log("login submit clicked");
    event.preventDefault();
    const data = this.state; 
    console.log("data = ", data)
    const resLogin = this.postLogin(JSON.stringify(data));
  }
  postLogin = async (data) => {
    console.log("data in func = ",data)
    const response = await fetch('/login', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        }, 
        body: data
      });
    const status = response.status;
    console.log(status);
    const res = await response.json(); 
    console.log(res)
    switch(status){
      case '200':
        console.log("login status = ", status)
      break;
      case '400':
          console.log("login status = ", status)
      break; 
      case '500':
          console.log("login status = ", status)
      break;
      default:
        console.log("login status is default = ", status)
      break;
    }
  }
  render(){
    const { classes, onRouteChange } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate name="login" onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={() => onRouteChange('ForgotPassword')}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => onRouteChange('Register')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Grid>
            <Footer />
          </Grid>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles)(Login);