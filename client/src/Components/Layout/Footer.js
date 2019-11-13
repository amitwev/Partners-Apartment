import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    position:'absolute',
    left:'0px',
    bottom:'0px',
    right:'0px',
    marginBottom:'10px'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
  },
  center:{
    textAlign:"center"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
        <Container maxWidth="sm" className={classes.root}>
            <Typography className={classes.center}>Partners Apartment Application</Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © Amit Salim'}
            </Typography>
        </Container>
    </div>
  );
}