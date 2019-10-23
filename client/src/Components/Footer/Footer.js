import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography>Partners Apartment Application</Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © Amit Salim'}
                </Typography>
            </Container>
      </footer>
    </div>
  );
}