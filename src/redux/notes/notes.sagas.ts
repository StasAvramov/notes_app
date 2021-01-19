import { put, takeLatest, all, call, take, select } from 'redux-saga/effects';

import {
  getNotesRequest,
  getNotesSuccess,
  getNotesError,
  createNoteRequest,
  createNoteSuccess,
  createNoteError,
  editNoteRequest,
  editNoteSuccess,
  editNoteError,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteError,
} from './notes.actions';

import {
  createNotesChannel,
  firestoreCreateNote,
  firestoreDeleteNote,
  firestoreEditNote,
} from '../../services/firebase.notes.service';

import { RootState } from '../store';

function* getNotes() {
  try {
    const { email } = yield select((state: RootState) => state.auth.user);
    const channel = yield call(createNotesChannel, email);

    while (true) {
      const notes = yield take(channel);
      yield put(getNotesSuccess(notes));
    }
  } catch (error) {
    yield put(getNotesError(error));
  }
}

function* addNote(action: ReturnType<typeof createNoteRequest>) {
  try {
    yield call(firestoreCreateNote, action.payload);

    yield put(createNoteSuccess());
  } catch (error) {
    yield put(createNoteError(error as Error));
  }
}

function* editNote(action: ReturnType<typeof editNoteRequest>) {
  try {
    const { id, fieldsToUpdate } = action.payload;
    yield call(firestoreEditNote, id, fieldsToUpdate);

    yield put(editNoteSuccess());
  } catch (error) {
    yield put(editNoteError(error));
  }
}

function* deleteNote(action: ReturnType<typeof deleteNoteRequest>) {
  try {
    yield call(firestoreDeleteNote, action.payload.id);

    yield put(deleteNoteSuccess());
  } catch (error) {
    yield put(deleteNoteError(error));
  }
}

export default function* notesSaga() {
  yield all([
    yield takeLatest(getNotesRequest.type, getNotes),
    yield takeLatest(createNoteRequest.type, addNote),
    yield takeLatest(deleteNoteRequest.type, deleteNote),
    yield takeLatest(editNoteRequest.type, editNote),
  ]);
}
