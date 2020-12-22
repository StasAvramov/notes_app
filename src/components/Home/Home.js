import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import { LOGOUT_REQUEST } from '../../redux/auth/auth.actions';
import { GET_NOTES_REQUEST } from '../../redux/notes/notes.actions';

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
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);

  useEffect(() => {
    if (notes) {
      return;
    }
    dispatch(GET_NOTES_REQUEST());
  }, [dispatch, notes]);

  function onLogout() {
    dispatch(LOGOUT_REQUEST());
  }
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={onLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" className={classes.container}>
        <Box className={classes.paper}>
          <Notes notes={notes} />
        </Box>
      </Container>
    </>
  );
}

export default Home;
