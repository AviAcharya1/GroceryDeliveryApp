import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container component="main" className={classes.main} maxWidth="lg">
        {children}
      </Container>
    </div>
  );
}

export default Layout;