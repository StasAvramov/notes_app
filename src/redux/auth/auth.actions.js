import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('AUTH/LOGIN_REQUEST');
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
export const loginError = createAction('AUTH/LOGIN_ERROR');

export const logoutRequest = createAction('AUTH/LOGOUT_REQUEST');
export const logoutSuccess = createAction('AUTH/LOGOUT_SUCCESS');
export const logoutError = createAction('AUTH/LOGOUT_ERROR');

export const getCurrentUserRequest = createAction('AUTH/CURRENT_USER_REQUEST');
export const getCurrentUserSuccess = createAction('AUTH/CURRENT_USER_SUCCESS');
export const getCurrentUserError = createAction('AUTH/CURRENT_USER_ERROR');
