import { put, takeLatest, all, call } from 'redux-saga/effects';

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

import {
  createNote,
  getNoteToUpdateIndex,
  updateNote,
} from '../../services/notes.service';

import { DEFAULT_NOTES } from '../../notes';

function getNotesFromLocalStorageAsJS() {
  const NOTES_AS_JSON = localStorage.getItem('notes');

  if (!NOTES_AS_JSON) {
    localStorage.setItem('notes', JSON.stringify(DEFAULT_NOTES));

    return DEFAULT_NOTES;
  }

  return JSON.parse(NOTES_AS_JSON);
}

function* getNotes(action) {
  try {
    const NOTES = yield call(getNotesFromLocalStorageAsJS);

    yield put(getNotesSuccess(NOTES));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* addNote(action) {
  try {
    const NOTES = yield call(getNotesFromLocalStorageAsJS);

    const NEW_NOTE = yield call(createNote, action.payload);

    NOTES.push(NEW_NOTE);
    localStorage.setItem('notes', JSON.stringify(NOTES));

    yield put(createNoteSuccess(NEW_NOTE));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* editNote(action) {
  try {
    const { id, ...fieldsToUpdate } = action.payload;

    const NOTES = yield call(getNotesFromLocalStorageAsJS);

    const noteToUpdateIndex = yield call(getNoteToUpdateIndex, NOTES, id);

    yield call(updateNote, NOTES, noteToUpdateIndex, fieldsToUpdate);

    localStorage.setItem('notes', JSON.stringify(NOTES));

    yield put(editNoteSuccess(NOTES[noteToUpdateIndex]));
  } catch (error) {
    console.error(error);
    // yield put(getNotesError(error));
  }
}

function* deleteNote(action) {
  try {
    const NOTES = yield call(getNotesFromLocalStorageAsJS);

    const NEW_NOTES = NOTES.filter(note => note.id !== action.payload.id);
    localStorage.setItem('notes', JSON.stringify(NEW_NOTES));

    yield put(deleteNoteSuccess(action.payload));
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
