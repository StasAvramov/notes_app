import React from 'react';
import Note from './Note';

export default function Notes({ notes }) {
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
