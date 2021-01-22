import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import { useNotes } from '../../../hooks';
import { ROUTES } from '../../../constants/routes';
import { NoteType } from '../../../types/main';
import './note.scss';

type Props = { note: NoteType };

const Note: FC<Props> = ({ note }) => {
  const { onDeleteNote } = useNotes();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteNoteClick = () => {
    onDeleteNote(note.id);
  };

  return (
    <div className="Note">
      <div className="Note__top">
        <div className="Note__expand">
          <div className="chip">{note.category}</div>
          <button
            // className={
            //     expanded
            //       ? `${classes.expand} ${classes.expandOpen}`
            //       : classes.expand}
            onClick={handleExpandClick}
            //   aria-expanded={expanded}
            //   aria-label="show more"
          >
            {!expanded ? 'Show' : 'Hide'}
          </button>
        </div>
        <div className="Note__header">
          <p className="title">Title: {note.title}</p>
          <p>
            {note.updatedAt
              ? `Updated: ${note.updatedAt}`
              : `Created: ${note.createdAt}`}
          </p>
        </div>
      </div>
      {expanded && (
        <div className="Note__content">
          <p className="description">{note.description}</p>
          <div className="buttons">
            <button>
              <Link to={ROUTES.dynamic.edit(note.id)}>Edit</Link>
            </button>
            <button>
              <Link to={ROUTES.dynamic.details(note.id)}>View</Link>
            </button>
            <button className="delete" onClick={handleDeleteNoteClick}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
