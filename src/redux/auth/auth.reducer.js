// import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth.actions';

const initialUserState = { email: null };
const userReducer = createReducer(initialUserState, {
  [authActions.loginSuccess]: (_, { payload }) => payload,
  [authActions.currentUserSuccess]: (prevState, { payload }) => ({
    ...prevState,
    ...payload,
  }),
});

export default userReducer;
