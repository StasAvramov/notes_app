import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  editNoteRequest,
} from '../redux/notes/notes.actions';

export default function useNotes() {
  const dispatch = useDispatch();

  const notes = useSelector(state => state.notes);

  const getSortedNotes = (notes, category) => {
    if (!category) {
      return notes;
    }
    return notes.filter(note => note.category.toLowerCase() === category);
  };

  const getNotes = useCallback(() => dispatch(getNotesRequest()), [dispatch]);

  const onAddNote = params => dispatch(createNoteRequest(params));

  const onEditNote = updatedNote => dispatch(editNoteRequest(updatedNote));

  const onDeleteNote = noteId => dispatch(deleteNoteRequest({ id: noteId }));

  return {
    notes,
    getNotes,
    onAddNote,
    onDeleteNote,
    onEditNote,
    getSortedNotes,
  };
}
