import React from 'react';
import { useNotes } from '../../hooks';
import Note from './Note';

export default function Notes() {
  const { notes } = useNotes();
  return (
    <ul>
      {notes ? (
        notes.map(note => <Note key={note.id} note={note} />)
      ) : (
        <div>Loading...</div>
      )}
    </ul>
  );
}
