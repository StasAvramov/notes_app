import { createAction } from '@reduxjs/toolkit';

export const LOGIN_REQUEST = createAction('AUTH/LOGIN_REQUEST');
export const LOGIN_SUCCESS = createAction('AUTH/LOGIN_SUCCESS');
export const LOGIN_ERROR = createAction('AUTH/LOGIN_ERROR');

export const LOGOUT_REQUEST = createAction('AUTH/LOGOUT_REQUEST');
export const LOGOUT_SUCCESS = createAction('AUTH/LOGOUT_SUCCESS');
export const LOGOUT_ERROR = createAction('AUTH/LOGOUT_ERROR');

export const CURRENT_USER_REQUEST = createAction('AUTH/CURRENT_USER_REQUEST');
export const CURRENT_USER_SUCCESS = createAction('AUTH/CURRENT_USER_SUCCESS');
export const CURRENT_USER_ERROR = createAction('AUTH/CURRENT_USER_ERROR');
