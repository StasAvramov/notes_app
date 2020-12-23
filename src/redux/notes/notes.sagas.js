import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getNotesRequest,
  getNotesSuccess,
  // getNotesError,
  // createNoteRequest,
  // createNoteSuccess,
  // createNoteError,
  // editNoteRequest,
  // editNoteSuccess,
  // editNoteError,
  // deleteNoteRequest,
  // deleteNoteSuccess,
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

export default function* notesSaga() {
  yield all([yield takeLatest(getNotesRequest().type, getNotes)]);
}
