// import { combineReducers } from 'redux';
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

const loadingReducer = createReducer(false, {
  [loginSuccess]: (_, { payload }) => true,
  [getCurrentUserSuccess]: (_, { payload }) => true,
  [logoutSuccess]: (_, { payload }) => false,
});

const authReducer = combineReducers({
  user: userReducer,
  isAuthReady: loadingReducer,
});

export default authReducer;
