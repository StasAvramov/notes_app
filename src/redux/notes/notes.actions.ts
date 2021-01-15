import { createAction } from '@reduxjs/toolkit';

import {
  CreateNoteParamsType,
  DeleteNotePayloadType,
  EditNoteRequestPayloadType,
  EditNoteSuccessPayloadType,
} from '../../types/notes';
import { NoteType, Nullable } from '../../types/main';

export const getNotesRequest = createAction('NOTES/GET_NOTES_REQUEST');
export const getNotesSuccess = createAction<Nullable<NoteType[]>>(
  'NOTES/GET_NOTES_SUCCESS',
);
export const getNotesError = createAction<Error>('NOTES/GET_NOTES_ERROR');

export const createNoteRequest = createAction<CreateNoteParamsType>(
  'NOTES/CREATE_NOTE_REQUEST',
);
export const createNoteSuccess = createAction<NoteType>(
  'NOTES/CREATE_NOTE_SUCCESS',
);
export const createNoteError = createAction<Error>('NOTES/CREATE_NOTE_ERROR');

export const deleteNoteRequest = createAction<DeleteNotePayloadType>(
  'NOTES/DELETE_NOTE_REQUEST',
);
export const deleteNoteSuccess = createAction<DeleteNotePayloadType>(
  'NOTES/DELETE_NOTE_SUCCESS',
);
export const deleteNoteError = createAction<Error>('NOTES/DELETE_NOTE_ERROR');

export const editNoteRequest = createAction<EditNoteRequestPayloadType>(
  'NOTES/EDIT_NOTE_REQUEST',
);
export const editNoteSuccess = createAction<EditNoteSuccessPayloadType>(
  'NOTES/EDIT_NOTE_SUCCESS',
);
export const editNoteError = createAction<Error>('NOTES/EDIT_NOTE_ERROR');
