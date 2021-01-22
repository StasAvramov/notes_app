import React from 'react';
import { useParams } from 'react-router-dom';

import Note from './Note';
import { CustomLoader } from '../common';

import { useNotes } from '../../hooks';
import './notes.scss';

type UseParamsCategoryType = {
  category: string;
};

export default function Notes() {
  const { category } = useParams<UseParamsCategoryType>();

  let { getSortedNotes } = useNotes();
  let sortedNotes = getSortedNotes(category);

  return (
    <ul className="Notes">
      {!sortedNotes ? (
        <CustomLoader />
      ) : sortedNotes.length > 0 ? (
        sortedNotes.map(note => <Note key={note.id} note={note} />)
      ) : (
        <div>
          <h1>Add your first note {category && `in ${category} category`}</h1>
        </div>
      )}
    </ul>
  );
}
