import React from 'react';

export default function Note({ note }) {
  return (
    <li>
      <p>
        <span>{note.title} </span>
        {note.description}
      </p>
    </li>
  );
}
