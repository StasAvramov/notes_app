// import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  loginSuccess,
  getCurrentUserSuccess,
  logoutSuccess,
} from './auth.actions';

const userReducer = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload,
  [getCurrentUserSuccess]: (prevState, { payload }) => payload,
  [logoutSuccess]: (_, { payload }) => null,
});

export default userReducer;
