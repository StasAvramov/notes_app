import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Category from '../Category';
import { CustomLoader } from '../common';
import Notes from '../Notes';

import { ROUTES } from '../../constants/routes';
import { useAuth, useNotes } from '../../hooks';

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
  const { isAuthenticated } = useAuth();
  const { isNotesReady, getNotes } = useNotes();

  useEffect(() => {
    if (isAuthenticated && !isNotesReady) {
      getNotes();
    }
  }, [isAuthenticated, getNotes, isNotesReady]);

  return (
    <>
      <Category />
      {isNotesReady ? <Notes /> : <CustomLoader />}
      <Button
        component={Link}
        to={ROUTES.add}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddIcon fontSize="large" />}
      >
        Add note
      </Button>
    </>
  );
}
