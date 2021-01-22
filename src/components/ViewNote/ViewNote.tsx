import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Buttons } from '../index';
import { CustomLoader } from '../common';
import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';

import { NoteType, Nullable } from '../../types/main';
import './view_note.scss';

type UseParamsIdType = { id: string };

export default function ViewNote() {
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
        <div className="Viewnote">
          <p className="Viewnote__title">Title: {note.title}</p>
          <p className="Viewnote__category">Category: {note.category}</p>
          <p className="Viewnote__description">{note.description}</p>
          <Buttons />
        </div>
      )}
    </>
  );
}
