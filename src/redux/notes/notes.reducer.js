import { createReducer } from '@reduxjs/toolkit';

import {
  getNotesSuccess,
  // createNoteSuccess,
  // editNoteSuccess,
  // deleteNoteSuccess,
} from './notes.actions';
import { logoutSuccess } from '../auth/auth.actions';

const notesReducer = createReducer(null, {
  [getNotesSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: (_, { payload }) => null,
});

export default notesReducer;
