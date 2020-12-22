import { put, takeLatest, all } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  // LOGOUT_ERROR,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  // CURRENT_USER_ERROR,
} from './auth.actions';

function* login({ payload }) {
  try {
    const USER = JSON.stringify(payload);
    localStorage.setItem('user', USER);

    yield put(LOGIN_SUCCESS(payload));
  } catch (error) {
    console.error(error);
    // yield put(LOGIN_ERROR(error));
  }
}

function* logout() {
  try {
    localStorage.removeItem('user');

    yield put(LOGOUT_SUCCESS());
  } catch (error) {
    console.error(error);
    // yield put(LOGOUT_ERROR(error));
  }
}

function* getCurrentUser() {
  try {
    const USER_AS_JSON = localStorage.getItem('user');
    if (!USER_AS_JSON) {
      yield put(CURRENT_USER_SUCCESS(null));
    } else {
      const USER = JSON.parse(USER_AS_JSON);

      yield put(CURRENT_USER_SUCCESS(USER));
    }
  } catch (error) {
    console.error(error);
    // yield put(CURRENT_USER_ERROR(error));
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(LOGIN_REQUEST().type, login),
    yield takeLatest(LOGOUT_REQUEST().type, logout),
    yield takeLatest(CURRENT_USER_REQUEST().type, getCurrentUser),
  ]);
}
