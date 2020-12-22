import { createReducer } from '@reduxjs/toolkit';

import {
  GET_NOTES_SUCCESS,
  // NOTE_CREATE_SUCCESS,
  // NOTE_EDIT_SUCCESS,
  // NOTE_DELETE_SUCCESS,
} from './notes.actions';
import { LOGOUT_SUCCESS } from '../auth/auth.actions';

const notesReducer = createReducer(null, {
  [GET_NOTES_SUCCESS]: (_, { payload }) => payload,
  [LOGOUT_SUCCESS]: (_, { payload }) => null,
});

export default notesReducer;
