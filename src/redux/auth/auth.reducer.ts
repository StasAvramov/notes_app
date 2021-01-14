import {
  combineReducers,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  logoutSuccess,
} from './auth.actions';
import { Nullable } from '../../types/main';
import { UserPayloadType } from '../../types/auth';
import notesReducer from '../notes/notes.reducer';

const initialUserState = null as Nullable<UserPayloadType>;
const initialErrorState = null as any;

const userReducer = createReducer(initialUserState, builder => {
  builder
    .addCase(loginSuccess, (state, { payload }) => payload)
    .addCase(getCurrentUserSuccess, (state, { payload }) => payload)
    .addCase(logoutSuccess, (state, { payload }) => null);
});

const isAuthReady = createReducer(false, builder => {
  builder
    .addCase(loginSuccess, (state, { payload }) => true)
    .addCase(getCurrentUserSuccess, (state, { payload }) => true)
    .addCase(loginError, (state, { payload }) => true)
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
