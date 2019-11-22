import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Divider, TextField, Container, Button, NativeSelect, InputBase, FormControl, IconButton,InputAdornment, OutlinedInput  } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles(theme => ({
    modal:{
    animationDuration: '300ms',
    WebkitAnimationDuration: '300ms',
    boxShadow: '1px rgba(0,0,0,.2)',
    borderRadius: '3px',
    padding: '15px',
    width:'400px',
    height:640,
    position: 'absolute',// for center
    top: '50%',// for center
    left: '50%',// for center
    transform: 'translate(-50%, -50%) !important'// for center
},
container:{
    height:'inherit',
},
modalFooter:{
    position: 'absolute',
    transform: 'translate(30%, 10%)'
},
modalBody:{
    padding:'5%',
}, 
button:{
    margin: theme.spacing(1),
    textAlign:'center',
},
margin: {
    margin: theme.spacing(1),
  },
}));

const AssignToApartmentModal = ({show, closeModal, handleChange, apartments, assignUserToApartmentDetails, saveAssignUserToApartment}) => {
    console.log(apartments);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(
        <Rodal  visible={show} 
            className={classes.modal}
            animation={'rotate'}
            animationDuration={'300ms'}
            showMask={false}
            height={500}
            onClose={() => closeModal('assignUserToApartment')}>
                <Container  className={classes.container}
                            onClose={() => closeModal('assignUserToApartment')}>
                    <div className={classes.modalHeader}>
                            <h1>Sign in to Apartment</h1>
                            <Divider />
                    </div>
                    <div className={classes.modalBody}>
                        <FormControl className={classes.margin}>
                            <NativeSelect
                                name={'assignUserToApartmentDetails'} 
                                id={'apartmentid'}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                >
                                    <option value={null} 
                                            key={null} 
                                            id={null}
                                    >
                                        Select Apartment!
                                    </option>
                                {apartments.rows.map(element => {
                                        return(
                                            <option value={element.apartmentid} 
                                                    key={element.apartmentid} 
                                                    id={element.id}
                                            >
                                                {element.name}
                                            </option>
                                        )
                                })}
                            </NativeSelect>
                        </FormControl>
                        <TextField
                            value={assignUserToApartmentDetails.email}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="assignUserToApartmentDetails"
                            autoFocus
                            onChange={handleChange}
                            className={classes.margin}
                            />
                        <OutlinedInput
                            value={assignUserToApartmentDetails.secret}
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            required
                            fullWidth
                            id="secret"
                            label="Apartment Secret"
                            name="assignUserToApartmentDetails"
                            autoFocus
                            onChange={handleChange}
                            className={classes.margin}
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                    </div>
                    <div className={classes.modalFooter}>
                        <Button  
                                className={classes.button}
                                variant="contained" 
                                color={'primary'} 
                                onClick={() => saveAssignUserToApartment()}>
                                save
                        </Button>
                        <Button className={classes.button}
                                variant="contained" 
                                color={'secondary'} 
                                onClick={() => closeModal('assignUserToApartment')}>
                                Close
                        </Button>
                    </div>
                </Container>
        </Rodal>
    )
}

export default AssignToApartmentModal;