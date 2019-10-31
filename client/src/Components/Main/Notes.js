import React from 'react'; 
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button }  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    centerContainer:{
        display: 'flex',
        justifyContent:'center', 
        alignItems:'center'
    },
  }));
  const ValidationTextField = withStyles({
    root: {
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    },
  })(TextField);
const Notes = () => {
    const classes = useStyles();
    return(
        <Container fixed className={classes.centerContainer}>
            <ValidationTextField
                className={classes.margin}
                label="Add Note"
                required
                variant="outlined"
                defaultValue=""
                id="validation-outlined-input"
            />
            <Button variant="outlined" color="primary" className={classes.button}>
                Add Note
            </Button>
        </Container>
    )
}
export default Notes;