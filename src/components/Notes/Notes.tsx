import React from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Note from './Note';
import { CustomLoader } from '../common';

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

type UseParamsCategoryType = {
  category: string;
};

export default function Notes() {
  const classes = useStyles();
  const { category } = useParams<UseParamsCategoryType>();

  let { getSortedNotes } = useNotes();
  let sortedNotes = getSortedNotes(category);

  return (
    <Box component="ul" className={classes.list}>
      {!sortedNotes ? (
        <CustomLoader />
      ) : sortedNotes.length > 0 ? (
        sortedNotes.map(note => <Note key={note.id} note={note} />)
      ) : (
        <div>
          <h1>Add your first note</h1>
        </div>
      )}
    </Box>
  );
}
