import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { Box, Button } from '@material-ui/core';

import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';

type UseParamsIdType = {
  id: string;
};

export default function Buttons() {
  const match = useRouteMatch<UseParamsIdType>();
  const { onDeleteNote } = useNotes();

  const IS_ADD_VIEW = !match.params.id;
  const IS_EDIT_VIEW = match.path.includes('edit');
  const NOTE_ID = match.params.id;

  const handleClick = () => {
    onDeleteNote(NOTE_ID);
  };

  return (
    <Box /*className=container*/>
      <Button
        component={Link}
        to={ROUTES.home}
        type="button"
        variant="contained"
        color="primary"
        // className={button}
      >
        {IS_ADD_VIEW || IS_EDIT_VIEW ? 'Cancel' : 'Back'}
      </Button>

      {IS_ADD_VIEW && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // className={classes.button}
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
              // className={classes.button}
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
              // className={classes.button}
            >
              Edit
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            onClick={handleClick}
          >
            Delete
          </Button>
        </>
      )}
    </Box>
  );
}
