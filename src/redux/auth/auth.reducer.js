// import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  LOGIN_SUCCESS,
  CURRENT_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from './auth.actions';

const userReducer = createReducer(null, {
  [LOGIN_SUCCESS]: (_, { payload }) => payload,
  [CURRENT_USER_SUCCESS]: (prevState, { payload }) => payload,
  [LOGOUT_SUCCESS]: (_, { payload }) => null,
});

export default userReducer;
