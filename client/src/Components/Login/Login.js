import React, { Component } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, withStyles, Typography, Container } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Footer from '../Layout/Footer'; 
import AuthHelper from '../AuthHelper/AuthHelper.js';
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
      email: '', 
      password:'', 
      rememberMe: false
    }
  }
  async componentDidMount(){
    if(authHelper.isLogIn()){
      this.props.history.replace('/homepage'); 
    }else{
      const userEmailSaved = await localStorage.getItem('email'); 
      const checkboxSave = await localStorage.getItem('rememberMe');
      if(checkboxSave){
        await this.setState({
          email: userEmailSaved, 
          rememberMe: checkboxSave
      })
    }
    
    }    
  }
  handleChange = (event) => {
    const name = event.target.name; 
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    })
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const data = this.state; 
    const resLogin = await this.postLogin(JSON.stringify(data));
    if(resLogin.success && !resLogin.hasError && !!resLogin.token){
      const { email, rememberMe } = this.state; 
      localStorage.setItem('rememberMe', rememberMe);
      localStorage.setItem('email', rememberMe ? email : '');
      localStorage.setItem('token', resLogin.token);
      this.props.history.replace('/homepage');      
     }else{
      //add pop up -> invalid user name/pass
    }
  }
  postLogin = async (data) => {
    const response = await fetch('/login', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        }, 
        body: data
      });
    const res = await response.json(); 
    return res; 
  }
  render(){
    const { classes } = this.props;
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
              value={this.state.email}
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
              value={this.state.rememberMe}
              control={<Checkbox color="primary" />}
              label="Remember me"
              name="rememberMe"
              onChange={this.handleChange}
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
                <Link className={classes.pointer} variant="body2" href="/forgotpassword">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.pointer} variant="body2" href="/register">
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