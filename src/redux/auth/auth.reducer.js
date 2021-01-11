import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  logoutSuccess,
} from './auth.actions';

const userReducer = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: (_, { payload }) => null,
});

const isAuthReady = createReducer(false, {
  [loginSuccess]: (_, { payload }) => true,
  [getCurrentUserSuccess]: (_, { payload }) => true,
  [loginError]: (_, { payload }) => true,
  [getCurrentUserError]: (_, { payload }) => true,
  [logoutSuccess]: (_, { payload }) => false,
});

const errorReducer = createReducer(null, {
  [loginError]: (_, { payload }) => payload,
  [getCurrentUserError]: (_, { payload }) => payload,
  [logoutSuccess]: (_, { payload }) => null,
});

const authReducer = combineReducers({
  user: userReducer,
  isAuthReady,
  error: errorReducer,
});

export default authReducer;
