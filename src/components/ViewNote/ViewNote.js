import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Buttons } from '../../components';
import { useNotes } from '../../hooks';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(2.5),
  },
}));

export default function ViewNote() {
  const classes = useStyles();
  const { id } = useParams();
  const { getNoteById } = useNotes();
  // const note = getNoteById(id);
  const [note, setNote] = useState(null);

  useEffect(() => {
    setNote(getNoteById(id));
  }, [id, getNoteById]);

  return (
    <>
      {!note ? (
        <div>Loading...</div>
      ) : (
        <Box className={classes.container}>
          <Paper elevation={3} className={classes.paper}>
            <Typography component="h1" variant="h3">
              {note.title}
            </Typography>
            <Typography component="p">Category: {note.category}</Typography>
            <Typography>{note.description}</Typography>
            <Buttons />
          </Paper>
        </Box>
      )}
    </>
  );
}
