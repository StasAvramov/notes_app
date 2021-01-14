import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  editNoteRequest,
} from '../redux/notes/notes.actions';

import { RootState } from '../redux/store';
import { NoteType, Nullable } from '../types/main';
import {
  CreateNoteParamsType,
  EditNoteRequestPayloadType,
} from '../types/notes';

export default function useNotes() {
  const dispatch = useDispatch();

  const { notes, isNotesReady } = useSelector((state: RootState) => state.data);

  const getNoteById = (noteId: NoteType['id']): Nullable<NoteType> => {
    const note = notes.find(note => note.id === noteId);
    return note ? note : null;
  };

  const getSortedNotes = (category: NoteType['category']) => {
    if (!category) {
      return notes;
    }
    return notes.filter(note => note.category.toLowerCase() === category);
  };

  const getNotes = useCallback(() => dispatch(getNotesRequest()), [dispatch]);

  const onAddNote = (params: CreateNoteParamsType) =>
    dispatch(createNoteRequest(params));

  const onEditNote = (payload: EditNoteRequestPayloadType) =>
    dispatch(editNoteRequest(payload));

  const onDeleteNote = (noteId: NoteType['id']) =>
    dispatch(deleteNoteRequest({ id: noteId }));

  return {
    notes,
    isNotesReady,
    getNoteById,
    getNotes,
    onAddNote,
    onDeleteNote,
    onEditNote,
    getSortedNotes,
  };
}
