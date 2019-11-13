import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, Button, Typography } from '@material-ui/core';
import AuthHelper from '../AuthHelper/AuthHelper';
//
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';
//react-router-dom
import { Link as LinkRouter } from "react-router-dom";
//

const authHelper = new AuthHelper();

const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      overflowX: 'auto',
      display:'flex',
      justifyContent:'center', 
      alignItems:'center',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
    markdown: {
      ...theme.typography.body2,
      padding: theme.spacing(3, 0),
    },
    sidebarAboutBox: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
      marginTop: theme.spacing(3),
    },
    links: {
      textDecoration: 'none',
      color: 'black', 
      display:'inline-block',
      marginLeft:'25px', 
    },
    
  }));
  const Header = ( props ) => {
      const classes = useStyles();
      const logOutUser = () => {
      console.log("log out clicked");
      authHelper.logout(); 
      console.log("token", localStorage.getItem('token'))
      window.location.reload(false);
    }
    const { currentLocation } = props;
    console.log("currenct location in header = ", currentLocation)
    return(
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Button size="small">
              Home
          </Button>
          <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
          >
              Partners Apartment Application
          </Typography>
          <Button variant="outlined" size="small" onClick={logOutUser}>
              Logout
          </Button>
        </Toolbar>
        <Toolbar 
            component="nav" 
            variant="dense" 
            className={classes.toolbarSecondary}>
              <MenuList>
                <LinkRouter to="/homepage"><MenuItem selected={currentLocation === '/homepage'} className={classes.links}>Summary</MenuItem></LinkRouter>
                <LinkRouter to="/userDetails"><MenuItem selected={currentLocation === '/userDetails'} className={classes.links}>User Details</MenuItem></LinkRouter>
                <LinkRouter to="/apartmentDetails"><MenuItem selected={currentLocation === '/apartmentDetails'} className={classes.links}>Apartment Details</MenuItem></LinkRouter>
                <LinkRouter to="/Notes"><MenuItem selected={currentLocation === '/Notes'} className={classes.links}>Notes</MenuItem></LinkRouter>
              </MenuList>
        </Toolbar>
        <Divider light />
      </Container>
    )
}
export default Header; 