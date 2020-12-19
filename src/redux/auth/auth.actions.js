import { createAction } from '@reduxjs/toolkit';

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');
const currentUserRequest = createAction('auth/currentUserRequest');
const currentUserSuccess = createAction('auth/currentUserSuccess');
const currentUserError = createAction('auth/currentUserError');

let authActions = {
  loginRequest,
  loginSuccess,
  loginError,
  currentUserRequest,
  currentUserSuccess,
  currentUserError,
};
export default authActions;
