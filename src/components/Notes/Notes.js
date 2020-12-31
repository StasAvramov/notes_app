import React from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Note from './Note';

import { useNotes } from '../../hooks';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    listStyleType: 'none',
    borderRadius: theme.shape.borderRadius,
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },
  },
}));

export default function Notes() {
  const classes = useStyles();
  let { notes, getSortedNotes } = useNotes();
  const { category } = useParams();

  let sortedNotes = getSortedNotes(notes, category);

  return (
    <Box component="ul" className={classes.list}>
      {sortedNotes ? (
        sortedNotes.map(note => <Note key={note.id} note={note} />)
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}
