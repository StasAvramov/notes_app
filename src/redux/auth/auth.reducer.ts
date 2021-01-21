import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  // loginRequest,
  // loginSuccess,
  loginError,
  // getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  logoutSuccess,
  // loginGoogleRequest,
  // loginGoogleSuccess,
  // loginGoogleError,
  // loginGithubRequest,
  // loginGithubError,
  // loginGithubSuccess,
} from './auth.actions';

import { Nullable } from '../../types/main';
import { UserLoginSuccessPayloadType } from '../../types/auth';

const initialUserState = null as Nullable<UserLoginSuccessPayloadType>;
const initialErrorState = null as any;

const userReducer = createReducer(initialUserState, builder => {
  builder
    // .addCase(loginSuccess, (state, { payload }) => state)
    .addCase(getCurrentUserSuccess, (state, { payload }) => payload)
    .addCase(logoutSuccess, (state, { payload }) => null);
});

const isAuthReady = createReducer(false, builder => {
  builder
    // .addCase(loginSuccess, (state, { payload }) => true)
    .addCase(getCurrentUserSuccess, (state, { payload }) => true)
    // .addCase(loginError, (state, { payload }) => true)
    .addCase(getCurrentUserError, (state, { payload }) => true)
    .addCase(logoutSuccess, (state, { payload }) => false);
});

const errorReducer = createReducer(initialErrorState, builder => {
  builder
    .addCase(loginError, (state, { payload }) => payload)
    .addCase(getCurrentUserError, (state, { payload }) => payload)
    .addCase(logoutSuccess, (state, { payload }) => null);
});

const authReducer = combineReducers({
  user: userReducer,
  isAuthReady,
  error: errorReducer,
});

export default authReducer;
