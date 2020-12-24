import { React, useEffect } from 'react';
import { useNotes } from '../../hooks';

import Header from '../Header';
import Category from '../Category';
import AddIcon from '@material-ui/icons/Add';

import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Notes from '../Notes';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    boxShadow: theme.shadows[15],
    paddingTop: theme.spacing(3),
    minHeight: '100vh',
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing(0),
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    margin: theme.spacing(0, 'auto'),
    borderRadius: theme.spacing(0),
    padding: theme.spacing(2, 4.75),
    [theme.breakpoints.up('md')]: {
      position: 'static',
      maxWidth: '450px',
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    if (!notes) {
      getNotes();
    }
  }, [notes, getNotes]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" className={classes.container}>
        <Category />
        <Notes />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddIcon fontSize="large" />}
        >
          Add note
        </Button>
      </Container>
    </>
  );
}
