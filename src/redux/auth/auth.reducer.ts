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
import { ErrorType, Nullable } from '../../types/main';
import { UserPayloadType } from '../../types/auth';

const initialUserState = null as Nullable<UserPayloadType>;

const userReducer = createReducer(initialUserState, builder => {
  builder
    .addCase(loginSuccess, (_, { payload }) => payload)
    .addCase(getCurrentUserSuccess, (_, { payload }) => payload)
    .addCase(logoutSuccess, (_, { payload }) => null);
});

const isAuthReady = createReducer(false, builder => {
  builder
    .addCase(loginSuccess, (_, { payload }) => true)
    .addCase(getCurrentUserSuccess, (_, { payload }) => true)
    .addCase(loginError, (_, { payload }) => true)
    .addCase(getCurrentUserError, (_, { payload }) => true)
    .addCase(logoutSuccess, (_, { payload }) => false);
});

const initialErrorState = null as Nullable<ErrorType>;
const errorReducer = createReducer(initialErrorState, builder => {
  builder
    .addCase(loginError, (_, { payload }) => payload)
    .addCase(getCurrentUserError, (_, { payload }) => payload)
    .addCase(logoutSuccess, (_, { payload }) => null);
});

const authReducer = combineReducers({
  user: userReducer,
  isAuthReady,
  error: errorReducer,
});

export default authReducer;
