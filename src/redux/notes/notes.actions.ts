import { createAction } from '@reduxjs/toolkit';

import {
  DeleteNotePayloadType,
  EditNoteRequestPayloadType,
  EditNoteSuccessPayloadType,
} from '../../types/notes';
import { ErrorType, NoteType, Nullable } from '../../types/main';

export const getNotesRequest = createAction('NOTES/GET_NOTES_REQUEST');
export const getNotesSuccess = createAction<Nullable<NoteType[]>>(
  'NOTES/GET_NOTES_SUCCESS',
);
export const getNotesError = createAction<Nullable<ErrorType>>(
  'NOTES/GET_NOTES_ERROR',
);

export const createNoteRequest = createAction<NoteType>(
  'NOTES/CREATE_NOTE_REQUEST',
);
export const createNoteSuccess = createAction<NoteType>(
  'NOTES/CREATE_NOTE_SUCCESS',
);
export const createNoteError = createAction<Nullable<ErrorType>>(
  'NOTES/CREATE_NOTE_ERROR',
);

export const deleteNoteRequest = createAction<DeleteNotePayloadType>(
  'NOTES/DELETE_NOTE_REQUEST',
);
export const deleteNoteSuccess = createAction<DeleteNotePayloadType>(
  'NOTES/DELETE_NOTE_SUCCESS',
);
export const deleteNoteError = createAction<Nullable<ErrorType>>(
  'NOTES/DELETE_NOTE_ERROR',
);

export const editNoteRequest = createAction<EditNoteRequestPayloadType>(
  'NOTES/EDIT_NOTE_REQUEST',
);
export const editNoteSuccess = createAction<EditNoteSuccessPayloadType>(
  'NOTES/EDIT_NOTE_SUCCESS',
);
export const editNoteError = createAction<Nullable<ErrorType>>(
  'NOTES/EDIT_NOTE_ERROR',
);
