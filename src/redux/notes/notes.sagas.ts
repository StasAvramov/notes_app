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
  createNote,
  getNoteToUpdateIndex,
  updateNote,
} from '../../services/notes.service';

import { NoteType } from '../../types/main';
import {
  createNotesChannel,
  firestoreCreateNote,
  firestoreDeleteNote,
  firestoreEditNote,
} from '../../services/firebase.notes.service';
import { db } from '../../firebase';
import { RootState } from '../store';

function* getNotes() {
  try {
    const {
      user: { email },
    } = yield select((state: RootState) => state.auth);
    const channel = createNotesChannel(email);

    while (true) {
      const notes = yield take(channel);
      console.log('notes', notes);
      yield put(getNotesSuccess(notes));
    }
  } catch (error) {
    yield put(getNotesError(error));
  }
}

function* addNote(action: ReturnType<typeof createNoteRequest>) {
  try {
    const newFirestoreNote: NoteType = yield call(
      firestoreCreateNote,
      action.payload,
    );

    yield put(createNoteSuccess(newFirestoreNote));
  } catch (error) {
    yield put(createNoteError(error as Error));
  }
}

function* editNote(action: ReturnType<typeof editNoteRequest>) {
  try {
    const { id, fieldsToUpdate } = action.payload;
    yield call(firestoreEditNote, id, fieldsToUpdate);
    //
    // const noteToUpdateIndex: ReturnType<
    //   typeof getNoteToUpdateIndex
    // > = yield call(getNoteToUpdateIndex, notes, id);
    //
    // yield call(updateNote, notes, noteToUpdateIndex, fieldsToUpdate);
    //
    //
    yield put(editNoteSuccess());
  } catch (error) {
    yield put(editNoteError(error));
  }
}

function* deleteNote(action: ReturnType<typeof deleteNoteRequest>) {
  try {
    // const newNotes: NoteType[] = notes.filter(
    //   note => note.id !== action.payload.id,
    // );
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
