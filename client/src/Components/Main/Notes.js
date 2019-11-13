import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button }  from '@material-ui/core';
import CardNote from './CardNote';
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
const cardContent = [
  {
    id:1, 
    name: "first name card", 
    content: "bla bla bla "
  }, 
  {
    id:2, 
    name: "2 name card", 
    content: "bla bla bla "
  }, 
  {
    id:3, 
    name: "3 name card", 
    content: "bla bla bla "
  }, 
]
const Notes = () => {
  const classes = useStyles();
  return(
      <Container fixed className={classes.centerContainer}>
        <Button variant="outlined" color="primary" className={classes.button}>
            Add Note
        </Button>
        {
          cardContent.map((i) => {
            console.log("in element for notes",i);
            return(
              <CardNote key={i.id} id={i.id} name={i.name} content={i.content} /> 
            );
          })
        }
      </Container>
  )
}
export default Notes;