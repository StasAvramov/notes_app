import { createAction } from '@reduxjs/toolkit';

export const GET_NOTES_REQUEST = createAction('NOTES/GET_NOTES_REQUEST');
export const GET_NOTES_SUCCESS = createAction('NOTES/GET_NOTES_SUCCESS');
export const GET_NOTES_ERROR = createAction('NOTES/GET_NOTES_ERROR');

export const NOTE_CREATE_REQUEST = createAction('NOTES/NOTE_CREATE_REQUEST');
export const NOTE_CREATE_SUCCESS = createAction('NOTES/NOTE_CREATE_SUCCESS');
export const NOTE_CREATE_ERROR = createAction('NOTES/NOTE_CREATE_ERROR');

export const NOTE_EDIT_REQUEST = createAction('NOTES/NOTE_EDIT_REQUEST');
export const NOTE_EDIT_SUCCESS = createAction('NOTES/NOTE_EDIT_SUCCESS');
export const NOTE_EDIT_ERROR = createAction('NOTES/NOTE_EDIT_ERROR');

export const NOTE_DELETE_REQUEST = createAction('NOTES/NOTE_DELETE_REQUEST');
export const NOTE_DELETE_SUCCESS = createAction('NOTES/NOTE_DELETE_SUCCESS');
export const NOTE_DELETE_ERROR = createAction('NOTES/NOTE_DELETE_ERROR');
