import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  getNotesSuccess,
  getNotesError,
  // createNoteSuccess,
  createNoteError,
  // editNoteSuccess,
  editNoteError,
  // deleteNoteSuccess,
  deleteNoteError,
} from './notes.actions';

import { logoutSuccess } from '../auth/auth.actions';

import { NoteType, Nullable } from '../../types/main';

const initialNotesArrayState = [] as NoteType[];
const initialNotesErrorState = null as Nullable<Error>;

const notesArrayReducer = createReducer(initialNotesArrayState, builder => {
  builder
    .addCase(getNotesSuccess, (state, { payload }) => (!payload ? [] : payload))
    // .addCase(createNoteSuccess, (state, { payload }) => state)
    // .addCase(deleteNoteSuccess, (state, { payload }) => state)
    // .addCase(editNoteSuccess, (state, { payload }) => state)
    .addCase(logoutSuccess, () => []);
});

const isNotesReady = createReducer(false, builder => {
  builder
    .addCase(getNotesSuccess, () => true)
    .addCase(logoutSuccess, () => false);
});

const notesErrorReducer = createReducer(initialNotesErrorState, builder => {
  builder
    .addCase(getNotesError, (state, { payload }) => payload)
    .addCase(createNoteError, (state, { payload }) => payload)
    .addCase(editNoteError, (state, { payload }) => payload)
    .addCase(deleteNoteError, (state, { payload }) => payload)
    .addCase(logoutSuccess, () => null);
});

const notesReducer = combineReducers({
  notes: notesArrayReducer,
  isNotesReady,
  error: notesErrorReducer,
});

export default notesReducer;
