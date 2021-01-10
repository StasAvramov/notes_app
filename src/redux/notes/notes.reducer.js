import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  getNotesRequest,
  getNotesSuccess,
  getNotesError,
  createNoteSuccess,
  createNoteError,
  editNoteSuccess,
  editNoteError,
  deleteNoteSuccess,
  deleteNoteError,
} from './notes.actions';

import { logoutSuccess } from '../auth/auth.actions';

const notesArrayReducer = createReducer(null, {
  [getNotesSuccess]: (_, { payload }) => {
    return !payload ? [] : payload;
  },

  [createNoteSuccess]: (state, { payload }) => [...state, payload],

  [deleteNoteSuccess]: (state, { payload }) =>
    state.filter(el => el.id !== payload.id),

  [editNoteSuccess]: (state, { payload }) => {
    let noteToEdit = state.find(note => note.id === payload.id);
    let noteToEditIndex = state.indexOf(noteToEdit);
    state[noteToEditIndex] = {
      ...noteToEdit,
      ...payload,
    };
    return state;
  },

  [logoutSuccess]: (_, { payload }) => null,
});

const isNotesReady = createReducer(false, {
  [getNotesSuccess]: (_, { payload }) => true,
  [logoutSuccess]: (_, { payload }) => false,
});

const notesErrorReducer = createReducer(null, {
  [getNotesError]: (_, { payload }) => payload,
  [createNoteError]: (_, { payload }) => payload,
  [editNoteError]: (_, { payload }) => payload,
  [deleteNoteError]: (_, { payload }) => payload,
  [logoutSuccess]: (_, { payload }) => null,
});

const notesReducer = combineReducers({
  notes: notesArrayReducer,
  isNotesReady,
  error: notesErrorReducer,
});

export default notesReducer;
