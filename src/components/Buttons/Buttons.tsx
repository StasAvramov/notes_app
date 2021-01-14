import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import { UseParamsIdType } from '../../types/react-types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 2),
  },
}));

export default function Buttons() {
  const classes = useStyles();
  const match = useRouteMatch<UseParamsIdType>();
  const { onDeleteNote } = useNotes();

  const IS_ADD_VIEW = !match.params.id;
  const IS_EDIT_VIEW = match.path.includes('edit');
  const NOTE_ID = match.params.id;

  return (
    <Container className={classes.container}>
      <Button
        component={Link}
        to={ROUTES.home}
        type="button"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {IS_ADD_VIEW || IS_EDIT_VIEW ? 'Cancel' : 'Back'}
      </Button>

      {IS_ADD_VIEW && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add note
        </Button>
      )}

      {!IS_ADD_VIEW && (
        <>
          {IS_EDIT_VIEW ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save
            </Button>
          ) : (
            <Button
              component={Link}
              to={ROUTES.dynamic.edit(NOTE_ID)}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Edit
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => onDeleteNote(NOTE_ID)}
          >
            Delete
          </Button>
        </>
      )}
    </Container>
  );
}
