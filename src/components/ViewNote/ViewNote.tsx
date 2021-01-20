import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Buttons } from '../index';
import { CustomLoader } from '../common';
import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';

import { NoteType, Nullable } from '../../types/main';
type UseParamsIdType = { id: string };

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '500px',
    width: '450px',
    marginTop: theme.spacing(8),
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(2.5),
  },
  title: {
    display: 'block',
    wordWrap: 'break-word',
  },
}));

export default function ViewNote() {
  const classes = useStyles();
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
        <Paper elevation={3} className={classes.paper}>
          <Typography component="p" variant="h3" className={classes.title}>
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
