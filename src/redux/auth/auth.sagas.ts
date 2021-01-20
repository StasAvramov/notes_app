import { put, takeLatest, all, call } from 'redux-saga/effects';

import {
  loginRequest,
  loginSuccess,
  loginError,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginGoogleError,
  loginGithubRequest,
  loginGithubError,
  loginGithubSuccess,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth.actions';

import {
  onFirebaseGitHubLogin,
  onFirebaseGoogleLogin,
  onFirebaseLogin,
  onFirebaseLogout,
} from '../../services/firebase.auth.service';

function* login(action: ReturnType<typeof loginRequest>) {
  try {
    yield call(onFirebaseLogin, action.payload);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error));
  }
}

function* loginGoogle(action: ReturnType<typeof loginGoogleRequest>) {
  try {
    yield call(onFirebaseGoogleLogin);
    yield put(loginGoogleSuccess());
  } catch (error) {
    yield put(loginGoogleError(error));
  }
}

function* loginGithub(action: ReturnType<typeof loginGithubRequest>) {
  try {
    yield call(onFirebaseGitHubLogin);
    yield put(loginGithubSuccess());
  } catch (error) {
    yield put(loginGithubError(error));
  }
}

function* logout() {
  try {
    yield call(onFirebaseLogout);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
  }
}

function* getCurrentUser(action: ReturnType<typeof getCurrentUserRequest>) {
  try {
    yield put(getCurrentUserSuccess(action.payload));
  } catch (error) {
    yield put(getCurrentUserError(error));
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(loginRequest.type, login),
    yield takeLatest(logoutRequest.type, logout),
    yield takeLatest(getCurrentUserRequest.type, getCurrentUser),
    yield takeLatest(loginGoogleRequest.type, loginGoogle),
    yield takeLatest(loginGithubRequest.type, loginGithub),
  ]);
}
