import { put, takeLatest, all, call } from 'redux-saga/effects';

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

import { DEFAULT_NOTES } from '../../notes';
import { ErrorType, NoteType } from '../../types/main';

function getNotesFromLocalStorageAsJS(): NoteType[] {
  const notesAsJson = localStorage.getItem('notes');

  if (!notesAsJson) {
    localStorage.setItem('notes', JSON.stringify(DEFAULT_NOTES));

    return DEFAULT_NOTES;
  }

  return JSON.parse(notesAsJson);
}

function* getNotes() {
  try {
    const notes: ReturnType<typeof getNotesFromLocalStorageAsJS> = yield call(
      getNotesFromLocalStorageAsJS,
    );

    yield put(getNotesSuccess(notes));
  } catch (error) {
    yield put(getNotesError(error));
  }
}

function* addNote(action: ReturnType<typeof createNoteRequest>) {
  try {
    const notes: ReturnType<typeof getNotesFromLocalStorageAsJS> = yield call(
      getNotesFromLocalStorageAsJS,
    );

    const newNote: ReturnType<typeof createNote> = yield call(
      createNote,
      action.payload,
    );

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    yield put(createNoteSuccess(newNote));
  } catch (error) {
    yield put(createNoteError(error));
  }
}

function* editNote(action: ReturnType<typeof editNoteRequest>) {
  try {
    const { id, fieldsToUpdate } = action.payload;

    const notes: ReturnType<typeof getNotesFromLocalStorageAsJS> = yield call(
      getNotesFromLocalStorageAsJS,
    );

    const noteToUpdateIndex: ReturnType<
      typeof getNoteToUpdateIndex
    > = yield call(getNoteToUpdateIndex, notes, id);

    yield call(updateNote, notes, noteToUpdateIndex, fieldsToUpdate);

    localStorage.setItem('notes', JSON.stringify(notes));

    yield put(
      editNoteSuccess({
        note: notes[noteToUpdateIndex],
        idx: noteToUpdateIndex,
      }),
    );
  } catch (error) {
    yield put(editNoteError(error));
  }
}

function* deleteNote(action: ReturnType<typeof deleteNoteRequest>) {
  try {
    const notes: ReturnType<typeof getNotesFromLocalStorageAsJS> = yield call(
      getNotesFromLocalStorageAsJS,
    );

    const newNotes: NoteType[] = notes.filter(
      note => note.id !== action.payload.id,
    );
    localStorage.setItem('notes', JSON.stringify(newNotes));

    yield put(deleteNoteSuccess(action.payload));
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
