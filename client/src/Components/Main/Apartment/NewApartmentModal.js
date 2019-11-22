import React from 'react';
import Rodal from 'rodal';
import { Divider, TextField, Container, Button, makeStyles } from '@material-ui/core';
// include styles
import 'rodal/lib/rodal.css';

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
    button:{
        margin: theme.spacing(1),
        textAlign:'center',
    }
}));
const NewApartmentModal =({show, setStatusModalForAddNewApartment, closeModal, handleChange, saveNewApartment, setupNewApartmentDetails})=>{
    const classes = useStyles();
    console.log("details state =", setupNewApartmentDetails)
    return(
        <Rodal  visible={show} 
        className={classes.modal}
        animation={'rotate'}
        animationDuration={'300ms'}
        showMask={false}
        height={640}
        onClose={() => closeModal('setupNewApartmentModal')}>
            <Container  className={classes.container}
                        onClose={() => closeModal('setupNewApartmentModal')}>
                <div className={classes.modalHeader}>
                        <h1>Setup New Apartment</h1>
                        <Divider />
                </div>
                <div className={classes.modalBody}>
                    <TextField
                        value={setupNewApartmentDetails.name}
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Apartment Name"
                        name="setupNewApartmentDetails"
                        autoFocus
                        onChange={handleChange}
                        />
                    <TextField
                        value={setupNewApartmentDetails.street}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="street"
                        label="Street"
                        name="setupNewApartmentDetails"
                        autoFocus
                        onChange={handleChange}
                        />
                    <TextField
                        value={setupNewApartmentDetails.number}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="number"
                        label="Number"
                        name="setupNewApartmentDetails"
                        autoFocus
                        onChange={handleChange}
                        />
                    <TextField
                        value={setupNewApartmentDetails.city}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="setupNewApartmentDetails"
                        autoFocus
                        onChange={handleChange}
                        />
                    <TextField
                        value={setupNewApartmentDetails.country}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        name="setupNewApartmentDetails"
                        autoFocus
                        onChange={handleChange}
                        />
                    <TextField
                        value={setupNewApartmentDetails.secret}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="secret"
                        label="Secret"
                        name="setupNewApartmentDetails"
                        autoFocus
                        helperText="Key for romates to assign to the apartment"
                        onChange={handleChange}
                        />              
                    <Divider />
                </div>
                <div className={classes.modalFooter}>
                    <Button  
                            className={classes.button}
                            variant="contained" 
                            color={'primary'} 
                            onClick={saveNewApartment}>
                            save
                    </Button>
                    <Button className={classes.button}
                            variant="contained" 
                            color={'secondary'} 
                            onClick={() => closeModal('setupNewApartmentModal')}>
                            Close
                    </Button>
                </div>
            </Container>
        </Rodal>
    )
    
}
export default NewApartmentModal;