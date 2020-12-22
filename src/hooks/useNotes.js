import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getNotesRequest } from '../redux/notes/notes.actions';

export default function useNotes() {
  const dispatch = useDispatch();

  const notes = useSelector(state => state.notes);

  const getNotes = useCallback(() => dispatch(getNotesRequest()), [dispatch]);

  return {
    notes,
    getNotes,
  };
}
