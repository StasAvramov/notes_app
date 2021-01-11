import { createAction } from '@reduxjs/toolkit';

export const getNotesRequest = createAction('NOTES/GET_NOTES_REQUEST');
export const getNotesSuccess = createAction('NOTES/GET_NOTES_SUCCESS');
export const getNotesError = createAction('NOTES/GET_NOTES_ERROR');

export const createNoteRequest = createAction('NOTES/CREATE_NOTE_REQUEST');
export const createNoteSuccess = createAction('NOTES/CREATE_NOTE_SUCCESS');
export const createNoteError = createAction('NOTES/CREATE_NOTE_ERROR');

export const editNoteRequest = createAction('NOTES/EDIT_NOTE_REQUEST');
export const editNoteSuccess = createAction('NOTES/EDIT_NOTE_SUCCESS');
export const editNoteError = createAction('NOTES/EDIT_NOTE_ERROR');

export const deleteNoteRequest = createAction('NOTES/DELETE_NOTE_REQUEST');
export const deleteNoteSuccess = createAction('NOTES/DELETE_NOTE_SUCCESS');
export const deleteNoteError = createAction('NOTES/DELETE_NOTE_ERROR');
