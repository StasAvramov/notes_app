import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';

import { Buttons } from '../index';
import { CustomLoader } from '../common';
import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';

import { NoteType, Nullable } from '../../types/main';
type UseParamsIdType = { id: string };

export default function ViewNote() {
  const { id } = useParams<UseParamsIdType>();
  const { getNoteById, isNotesReady, getNotes } = useNotes();
  const history = useHistory();

  const [note, setNote] = useState<Nullable<NoteType>>(null);

  useEffect(() => {
    if (!isNotesReady) {
      getNotes();
      return;
    }
    if (getNoteById(id)) {
      setNote(getNoteById(id));
      return;
    }
    history.replace(ROUTES.home);
  }, [id, history, getNoteById, isNotesReady, getNotes]);

  return (
    <>
      {!note ? (
        <CustomLoader />
      ) : (
        <Paper
          elevation={3}
          // className={classes.paper}
        >
          <Typography
            component="p"
            variant="h3"
            // className={classes.title}
          >
            {note.title}
          </Typography>
          <Typography component="p">Category: {note.category}</Typography>
          <Typography>{note.description}</Typography>
          <Buttons />
        </Paper>
      )}
    </>
  );
}
