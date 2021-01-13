import { createAction } from '@reduxjs/toolkit';
import { UserPayloadType } from '../../types/auth';
import { ErrorType, Nullable } from '../../types/main';

export const loginRequest = createAction<UserPayloadType>('AUTH/LOGIN_REQUEST');
export const loginSuccess = createAction<UserPayloadType>('AUTH/LOGIN_SUCCESS');
export const loginError = createAction<ErrorType>('AUTH/LOGIN_ERROR');

export const logoutRequest = createAction('AUTH/LOGOUT_REQUEST');
export const logoutSuccess = createAction('AUTH/LOGOUT_SUCCESS');
export const logoutError = createAction<ErrorType>('AUTH/LOGOUT_ERROR');

export const getCurrentUserRequest = createAction('AUTH/CURRENT_USER_REQUEST');
export const getCurrentUserSuccess = createAction<Nullable<UserPayloadType>>(
  'AUTH/CURRENT_USER_SUCCESS',
);
export const getCurrentUserError = createAction<ErrorType>(
  'AUTH/CURRENT_USER_ERROR',
);