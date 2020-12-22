import { React, useEffect } from 'react';
import { useAuth, useNotes } from '../../hooks';
import Notes from '../Notes';
import {
  Container,
  Box,
  // Typography,
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: theme.shadows[15],
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    margin: '0 auto',
    boxShadow: theme.shadows[15],
    maxWidth: theme.breakpoints.values.md,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  text: {
    color: theme.palette.success.main,
  },
}));

function Home() {
  const classes = useStyles();
  const { onLogout } = useAuth();
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    if (!notes) {
      getNotes();
    }
  }, [notes, getNotes]);

  function logout() {
    onLogout();
  }

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" className={classes.container}>
        <Box className={classes.paper}>
          <Notes />
        </Box>
      </Container>
    </>
  );
}

export default Home;
