import { put, takeLatest, all } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth.actions';

function* login(action: ReturnType<typeof loginRequest>) {
  try {
    const user = JSON.stringify(action.payload);
    localStorage.setItem('user', user);

    yield put(loginSuccess(action.payload));
  } catch (error: any) {
    yield put(loginError(error));
  }
}

function* logout() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('notes');

    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutError(error));
  }
}

function* getCurrentUser() {
  try {
    const userAsJson = localStorage.getItem('user');
    if (!userAsJson) {
      yield put(getCurrentUserSuccess(null));
    } else {
      const user = JSON.parse(userAsJson);

      yield put(getCurrentUserSuccess(user));
    }
  } catch (error: any) {
    yield put(getCurrentUserError(error));
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(loginRequest.type, login),
    yield takeLatest(logoutRequest.type, logout),
    yield takeLatest(getCurrentUserRequest.type, getCurrentUser),
  ]);
}
