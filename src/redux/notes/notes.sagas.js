import { put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  // GET_NOTES_ERROR,
  // NOTE_CREATE_REQUEST,
  // NOTE_CREATE_SUCCESS,
  // NOTE_CREATE_ERROR,
  // NOTE_EDIT_REQUEST,
  // NOTE_EDIT_SUCCESS,
  // NOTE_EDIT_ERROR,
  // NOTE_DELETE_REQUEST,
  // NOTE_DELETE_SUCCESS,
  // NOTE_DELETE_ERROR,
} from './notes.actions';

function* getNotes(action) {
  try {
    const NOTES_AS_JSON = localStorage.getItem('notes');
    const NOTES = JSON.parse(NOTES_AS_JSON);

    yield put(GET_NOTES_SUCCESS(NOTES));
  } catch (error) {
    console.error(error);
    // yield put(LOGIN_ERROR(error));
  }
}

export default function* notesSaga() {
  yield all([yield takeLatest(GET_NOTES_REQUEST().type, getNotes)]);
}
