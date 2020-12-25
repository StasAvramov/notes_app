import { createReducer } from '@reduxjs/toolkit';

import {
  getNotesSuccess,
  createNoteSuccess,
  editNoteSuccess,
  deleteNoteSuccess,
} from './notes.actions';
import { logoutSuccess } from '../auth/auth.actions';

const notesReducer = createReducer(null, {
  [getNotesSuccess]: (_, { payload }) => payload,
  [createNoteSuccess]: (state, { payload }) => [...state, payload],
  [deleteNoteSuccess]: (state, { payload }) =>
    state.filter(el => el.id !== payload.id),
  [editNoteSuccess]: (state, { payload }) => {
    let filteredState = state.filter(note => note.id !== payload.id);
    filteredState.push(payload);
    return filteredState;
  },
  [logoutSuccess]: (_, { payload }) => null,
});

export default notesReducer;
