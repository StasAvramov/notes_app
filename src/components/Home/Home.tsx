import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

import Category from '../Category';
import { CustomLoader } from '../common';
import Notes from '../Notes';

import { ROUTES } from '../../constants/routes';
import { useAuth, useNotes } from '../../hooks';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { isNotesReady, getNotes, notes } = useNotes();

  useEffect(() => {
    if (isAuthenticated && !isNotesReady) {
      getNotes();
    }
  }, [isAuthenticated, getNotes, isNotesReady]);

  return (
    <div
    // className=container
    >
      {notes.length > 0 && <Category />}
      {isNotesReady ? <Notes /> : <CustomLoader />}
      <Button
        component={Link}
        to={ROUTES.add}
        variant="contained"
        color="primary"
        size="large"
        // className={classes.button}
        startIcon={<AddIcon fontSize="large" />}
      >
        Add note
      </Button>
    </div>
  );
}
