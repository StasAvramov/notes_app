import { put, takeLatest, all } from 'redux-saga/effects';

import {
  getNotesRequest,
  getNotesSuccess,
  // getNotesError,
  createNoteRequest,
  createNoteSuccess,
  // createNoteError,
  editNoteRequest,
  editNoteSuccess,
  // editNoteError,
  deleteNoteRequest,
  deleteNoteSuccess,
  // deleteNoteError,
} from './notes.actions';

function* getNotes(action) {
  try {
    const NOTES_AS_JSON = localStorage.getItem('notes');
    const NOTES = JSON.parse(NOTES_AS_JSON);

    yield put(getNotesSuccess(NOTES));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* addNote(action) {
  try {
    const NOTES_AS_JSON = localStorage.getItem('notes');
    const NOTES = JSON.parse(NOTES_AS_JSON);
    NOTES.push(action.payload);
    localStorage.setItem('notes', JSON.stringify(NOTES));

    yield put(createNoteSuccess(action.payload));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* deleteNote(action) {
  try {
    const NOTES_AS_JSON = localStorage.getItem('notes');
    const NOTES = JSON.parse(NOTES_AS_JSON);
    const NEW_NOTES = NOTES.filter(note => note.id !== action.payload.id);
    localStorage.setItem('notes', JSON.stringify(NEW_NOTES));

    yield put(deleteNoteSuccess(action.payload));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* editNote(action) {
  try {
    const NOTES_AS_JSON = localStorage.getItem('notes');
    const NOTES = JSON.parse(NOTES_AS_JSON);

    let noteToEdit = NOTES.find(note => note.id === action.payload.id);
    let noteToEditIndex = NOTES.indexOf(noteToEdit);
    NOTES[noteToEditIndex] = {
      ...noteToEdit,
      ...action.payload,
    };

    localStorage.setItem('notes', JSON.stringify(NOTES));

    yield put(editNoteSuccess(action.payload));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

export default function* notesSaga() {
  yield all([
    yield takeLatest(getNotesRequest().type, getNotes),
    yield takeLatest(createNoteRequest().type, addNote),
    yield takeLatest(deleteNoteRequest().type, deleteNote),
    yield takeLatest(editNoteRequest().type, editNote),
  ]);
}
