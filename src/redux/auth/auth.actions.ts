import { createAction } from '@reduxjs/toolkit';
import { UserLoginSuccessPayloadType, UserPayloadType } from '../../types/auth';
import { Nullable } from '../../types/main';

export const loginPhoneRequest = createAction('AUTH/LOGIN_PHONE_REQUEST');
export const loginPhoneSuccess = createAction('AUTH/LOGIN_PHONE_SUCCESS');
export const loginPhoneError = createAction<Error>('AUTH/LOGIN_PHONE_ERROR');

export const loginGoogleRequest = createAction('AUTH/LOGIN_GOOGLE_REQUEST');
export const loginGoogleSuccess = createAction('AUTH/LOGIN_GOOGLE_SUCCESS');
export const loginGoogleError = createAction<Error>('AUTH/LOGIN_GOOGLE_ERROR');

export const loginGithubRequest = createAction('AUTH/LOGIN_GITHUB_REQUEST');
export const loginGithubSuccess = createAction('AUTH/LOGIN_GITHUB_SUCCESS');
export const loginGithubError = createAction<Error>('AUTH/LOGIN_GITHUB_ERROR');

export const loginRequest = createAction<UserPayloadType>('AUTH/LOGIN_REQUEST');
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
export const loginError = createAction<Error>('AUTH/LOGIN_ERROR');

export const logoutRequest = createAction('AUTH/LOGOUT_REQUEST');
export const logoutSuccess = createAction('AUTH/LOGOUT_SUCCESS');
export const logoutError = createAction<Error>('AUTH/LOGOUT_ERROR');

export const getCurrentUserRequest = createAction<
  Nullable<UserLoginSuccessPayloadType>
>('AUTH/CURRENT_USER_REQUEST');
export const getCurrentUserSuccess = createAction<
  Nullable<UserLoginSuccessPayloadType>
>('AUTH/CURRENT_USER_SUCCESS');
export const getCurrentUserError = createAction<Error>(
  'AUTH/CURRENT_USER_ERROR',
);
