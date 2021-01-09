import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  getNotesRequest,
  getNotesSuccess,
  getNotesError,
  createNoteSuccess,
  editNoteSuccess,
  deleteNoteSuccess,
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

const isNotesLoading = createReducer(false, {
  [getNotesRequest]: (_, { payload }) => true,
  [getNotesSuccess]: (_, { payload }) => true,
  [logoutSuccess]: (_, { payload }) => false,
});

const notesReducer = combineReducers({
  notes: notesArrayReducer,
  loading: isNotesLoading,
});

export default notesReducer;
