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

function* login({ payload }) {
  try {
    const user = JSON.stringify(payload);
    localStorage.setItem('user', user);

    yield put(loginSuccess(payload));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* logout() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('notes');

    yield put(logoutSuccess());
  } catch (error) {
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
  } catch (error) {
    yield put(getCurrentUserError(error));
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(loginRequest().type, login),
    yield takeLatest(logoutRequest().type, logout),
    yield takeLatest(getCurrentUserRequest().type, getCurrentUser),
  ]);
}
