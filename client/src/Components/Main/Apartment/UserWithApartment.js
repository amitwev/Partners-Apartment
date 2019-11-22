import React from 'react';
import {Button, CssBaseline, TextField, Grid, Typography, makeStyles, Container} from '@material-ui/core/';
const useStyles = makeStyles(theme => ({
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
  }));
const UserWithApartment = ({apartment, handleChange, updateApartmentDetails}) => {
    const classes = useStyles();
    return (
        <div>
            <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Update Apartment Details
                    </Typography>
                    <form className={classes.form} noValidate name="register" onSubmit={updateApartmentDetails}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="apartmentDetails"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Apartment Name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={apartment.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="street"
                                    label="Street"
                                    name="apartmentDetails"
                                    onChange={handleChange}
                                    value={apartment.street}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="number"
                                    label="Number"
                                    name="apartmentDetails"
                                    onChange={handleChange}
                                    value={apartment.number}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="apartmentDetails"
                                    onChange={handleChange}
                                    value={apartment.city}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="apartmentDetails"
                                    onChange={handleChange}
                                    value={apartment.country}
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
export default UserWithApartment;