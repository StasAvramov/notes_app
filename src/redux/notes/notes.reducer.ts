import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
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

import {
  NotesReducerArrayStateType,
  NotesReducerErrorStateType,
} from '../../types/notes';

const initialNotesArrayState = null as NotesReducerArrayStateType;
const initialNotesErrorState = null as NotesReducerErrorStateType;

const notesArrayReducer = createReducer(initialNotesArrayState, builder => {
  builder
    .addCase(getNotesSuccess, (state, { payload }) => (!payload ? [] : payload))
    .addCase(createNoteSuccess, (state, { payload }) => {
      if (state) {
        state.push(payload);
        return state;
      }
      return [payload];
    })
    .addCase(deleteNoteSuccess, (state, { payload }) =>
      state ? state.filter(el => el.id !== payload.id) : state,
    )
    .addCase(editNoteSuccess, (state, { payload }) => {
      if (state) {
        state[payload.idx] = payload.note;
      }
      return state;
    })
    .addCase(logoutSuccess, () => null);
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
