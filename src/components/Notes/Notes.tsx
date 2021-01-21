import React from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@material-ui/core';

import Note from './Note';
import { CustomLoader } from '../common';

import { useNotes } from '../../hooks';

type UseParamsCategoryType = {
  category: string;
};

export default function Notes() {
  const { category } = useParams<UseParamsCategoryType>();

  let { getSortedNotes } = useNotes();
  let sortedNotes = getSortedNotes(category);

  return (
    <Box
      component="ul"
      // className={classes.list}
    >
      {!sortedNotes ? (
        <CustomLoader />
      ) : sortedNotes.length > 0 ? (
        sortedNotes.map(note => <Note key={note.id} note={note} />)
      ) : (
        <div>
          <h1>Add your first note {category && `in ${category} category`}</h1>
        </div>
      )}
    </Box>
  );
}
